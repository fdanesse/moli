import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthService {

  constructor(public afAuth: AngularFireAuth) {
    // firebase.auth().onAuthStateChanged((user) => {
  }

  exportAuth(): Observable<firebase.User> {
    // this.afAuth.authState.subscribe((user) => {});
    return this.afAuth.authState;
  }

  login(provider: string) {
    switch (provider) {
      case 'google': {
        return this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      }
    }
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

}
