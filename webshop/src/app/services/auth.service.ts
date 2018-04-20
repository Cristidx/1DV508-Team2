import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  get User() {
    return this.afAuth.auth.currentUser;
  }

  /* Subscribes to the authentication state to listen for any changes */
  constructor(private afAuth: AngularFireAuth) {
    afAuth.authState.subscribe((user) => {
      if (user != null) {
        console.log(user.email);
      } else {
        console.log(user);
      }
    });
  }

  signInWithRegularEmail(email: string, password: string) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  createAccountWithRegularEmail(email: string, password: string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  isSignedIn() {
    if (this.User) {
      return true;
    } else {
      return false;
    }
  }

  signOut() {
    if (this.isSignedIn()) {
      this.afAuth.auth.signOut()
      .catch((error) => console.log(error));
    } else {
      console.log('No user is logged in');
    }
  }
}
