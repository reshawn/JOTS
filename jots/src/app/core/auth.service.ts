import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { auth } from 'firebase/app';

import { Observable, BehaviorSubject } from 'rxjs';
export interface Item { name: string; }
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userDataDoc: AngularFirestoreDocument<Item>;
  user: Observable<firebase.User>;
  public isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private firebaseAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user = firebaseAuth.authState;
    if (this.firebaseAuth.auth.currentUser !== null) {
      this.isUserLoggedIn.next(true);
    }
  }
  update(item: Item) {
    this.userDataDoc.update(item);
  }
  set(item: Item) {
    this.userDataDoc.set(item);
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        //create doc
        var data = {
          name: value.user.email,
        }
        this.userDataDoc = this.afs.doc<Item>('users/' + value.user.uid);
        this.set(data)

      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  loginWithGoogle() {
    this.firebaseAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
      .then((result) => {
        console.log(result);
        this.isUserLoggedIn.next(true);
        if (result.additionalUserInfo.isNewUser) {
          //create doc
          var data = {
            name: result.user.email,
            firstname: result.additionalUserInfo.profile['given_name'],
            lastname: result.additionalUserInfo.profile['family_name'],
          }
          this.userDataDoc = this.afs.doc<Item>('users/' + result.user.uid);
          this.set(data)
          this.isUserLoggedIn.next(true);
        }
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!', value);
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
      });
  }

  logout() {
    this.firebaseAuth
      .auth
      .signOut();
    this.isUserLoggedIn.next(false);
  }

  isLoggedIn() {

  }

  getLoginState() {
    return this.isUserLoggedIn.asObservable();
  }
}
