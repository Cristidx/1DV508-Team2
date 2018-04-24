import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { User } from '../model/user';

@Injectable()
export class AuthService {
  private user: User;
  private adminEmails: any[];

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) {
    this.user = new User();
    this.subscribeToAuthState();
    this.subscribeToAdminEmails();
  }

  /* Subscribes to Observable<User> state to listen for any changes */
  subscribeToAuthState() {
    this.afAuth.authState.subscribe((user) => {
      this.user.FirebaseUser = user;
    });
  }

  subscribeToAdminEmails() {
    const dbRef = this.db.database.ref('AdminUsers/UIDS');
    this.db.list(dbRef).valueChanges().subscribe((adminEmails) => {
      if (adminEmails != null) {
        this.adminEmails = adminEmails;
      } else {
        console.log('Reference error');
      }
    });
  }

  signInWithRegularEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  createAccountWithRegularEmail(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  verifyAdminEmail(email: string): boolean {
    let isAdmin = false;
    for (let i = 0; i < this.adminEmails.length; i++) {
      console.log(this.adminEmails[i]);
      if (this.adminEmails[i] === email) {
        this.user.Admin = true;
        isAdmin = true;
        console.log(email + ' is admin: ' + this.user.Admin);
      }
    }

    return isAdmin;
  }

  isSignedIn() {
    if (this.user.FirebaseUser) {
      return true;
    } else {
      return false;
    }
  }

  signOut() {
    if (this.isSignedIn()) {
      this.user.Admin = false;
      this.afAuth.auth.signOut()
      .catch((error) => console.log(error));
    } else {
      console.log('No user is logged in');
    }
  }
}
