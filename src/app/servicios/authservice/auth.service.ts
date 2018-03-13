import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';


@Injectable()
export class AuthService {
  /*
  API de autenticación de usuario.
  */

  constructor(public afAuth: AngularFireAuth) {
    // firebase.auth().onAuthStateChanged((user) => {
  }

  obs(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  login(provider: string) {
    switch (provider) {
      case 'google': {
        return this.afAuth.auth.signInWithPopup(
          new firebase.auth.GoogleAuthProvider());
      }
    }
  }

  logout() {
    return this.afAuth.auth.signOut();
  }

}
