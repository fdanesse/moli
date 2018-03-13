import { Injectable } from '@angular/core';
// import { MoliUser } from '../models/moli-user';
import { AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { MoliUser } from '../../models/moli-user';


@Injectable()
export class UserdataService {
  /*
  Es el API de datos del usuario en la base de datos.
  */

  private users_collection: AngularFirestoreCollection<any>;

  constructor(public db: AngularFirestore) {
    this.users_collection = this.db.collection('usuarios');
    // private users: Observable<any[]>;
    // this.users = this.users_collection.valueChanges();
  }

  obs(uid: string) {
    return this.users_collection.doc(uid).snapshotChanges();
  }

  saveUser(user: MoliUser) {
    // coleccion.add({title: cont, title: cont ...}) id automático
    this.users_collection.doc(user.uid).set( (Object.assign({}, user)) )
      .then(success => console.log('SAVE', success))
      .catch(err => console.log('error en saveUser', err));
  }
}
