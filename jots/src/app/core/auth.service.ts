import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;
  loggedIn: Boolean;
  constructor(private firebaseAuth: AngularFireAuth) {
    this.user = firebaseAuth.authState;
    this.loggedIn = false;
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        this.loggedIn = true;
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  loginWithGoogle() {
    this.firebaseAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!', value);
        this.loggedIn = true;
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
    this.loggedIn = false;
  }

  isLoggedIn() {

  }
}
