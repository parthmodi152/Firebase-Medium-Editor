import { Injectable, NgZone } from '@angular/core';
import { User } from '../services/user'
import firebase from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import { Router } from "@angular/router";


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any
  
  constructor(
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone
  ) { 
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData))
        this.router.navigateByUrl('/dashboard');
      } else {
        this.userData = null;
        localStorage.removeItem('user')
        this.router.navigateByUrl('/sign-in');
      }
    })
  }

  get UserData(): User {

    var user = null;
    const userData = {
      uid: '',
      displayName: '',
      photoURL: ''
    }

    const ls_item = localStorage.getItem('user');
    if (ls_item) {
      user = JSON.parse(ls_item);
      userData.uid = user.uid;
      userData.displayName = user.displayName;
      userData.photoURL = user.photoURL;
    }

    return userData;
  }

  get isLoggedIn(): boolean {
    const user = localStorage.getItem('user');

    return user !== null
  }

  SignIn() {
    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.signInWithPopup(googleAuthProvider)
  }

  SignOut() {
    this.afAuth.signOut()
  }
}

