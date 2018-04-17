import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  constructor(private _firebaseAuth: AngularFireAuth) {
  }

  signInWithRegularEmail(email: string, password: string) {
    return this._firebaseAuth.auth.signInWithEmailAndPassword(email, password);
  }
}
