import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { User } from '../model/user';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import { query } from '@angular/animations';
import { Address } from '../model/address';
import { DocumentReference } from '@firebase/firestore-types';

@Injectable()
export class AuthService {
  users: User[];
  user: Observable<User>;
  uid: string;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router
  ) {
    this.user = this.afAuth.authState.switchMap(user => {
      if (user != null) {
        this.uid = user.uid;
        return this.db.doc<User>(`Users/${user.uid}`).valueChanges();
      } else {
        return Observable.of(null);
      }
    });
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  githubLogin() {
    const provider = new firebase.auth.GithubAuthProvider();
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider).then(credential => {
      this.createUserDocument(credential.user);
    });
  }

  saveUserAddress(address: Address) {
    const userRef = this.getUserRef();
    return userRef.update(address);
  }

  emptyAddress: Address = {
    street: '',
    city: '',
    zipCode: '',
    phoneNumber: ''
  };
  setUserAddressEmpty() {
    const userRef = this.getUserRef();
    return userRef.update(this.emptyAddress);
  }

  signInWithRegularEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signInAsAdmin(email: string, password: string) {
    this.signInWithRegularEmail(email, password).then(() => {
      this.user.subscribe(val => {
        if (val.admin) {
          this.router.navigateByUrl('');
        } else {
          this.signOut();
        }
      });
    });
  }

  createAccountWithRegularEmail(email: string, password: string) {
    return this.afAuth.auth
      .createUserAndRetrieveDataWithEmailAndPassword(email, password)
      .then(data => this.createUserDocument(data))
      .catch(error => console.log(error));
  }

  getUserRef() {
    return this.db.firestore.doc(`Users/${this.uid}`);
  }

  async getUserByUid(uid: string) {
    let user;
    let docRef = this.db.firestore.doc(`Users/${uid}`);
    return new Promise(resolve => {
      docRef.get().then(object => {
        user = object.data();
        resolve(user);
      });
    });
  }

  createUserDocument(data) {
    const user: User = {
      name: data.user.displayName,
      email: data.user.email,
      uid: data.user.uid,
      admin: false
    };
    const userRef = this.db.doc(`Users/${data.user.uid}`);
    return userRef.set(user);
  }

  getCurrentlySignedInUser() {
    if (this.user != null) {
      return this.user;
    } else {
      console.log('No user is signed in');
    }
  }

  getUid() {
    if (this.uid != null) {
      return this.uid;
    } else {
      console.log('No user is signed in');
    }
  }

  isSignedIn() {
    if (this.user) {
      return true;
    } else {
      return false;
    }
  }

  signOut() {
    if (this.isSignedIn()) {
      this.afAuth.auth.signOut();
    } else {
      console.log('No user is logged in');
    }
  }
}
