import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { User } from '../model/user';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Injectable()
export class AuthService {
  user: Observable<User>;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore, private router: Router) {
    this.user = this.afAuth.authState.switchMap(user => {
      if (user != null) {
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
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserDocument(credential.user);
      });
  }

  signInWithRegularEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  signInAsAdmin(email: string, password: string) {
    this.signInWithRegularEmail(email, password)
    .then(() => {
      this.user.subscribe((val) => {
        if (val.admin) {
          this.router.navigateByUrl('');
        } else {
          this.signOut();
        }
      });
    })
  }

  createAccountWithRegularEmail(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then((user) => this.updateUserDocument(user))
        .catch((error) => console.log(error));
  }

  updateUserDocument(user) {
    let userRef = this.db.doc<User>(`Users/${user.uid}`);

    const data: User = {
      email: user.email,
      name: user.displayName,
      uid: user.uid,
      admin: false
    }

    return userRef.set(data, { merge: true})
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
