import { Injectable } from '@angular/core';
import { AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Liceomodel } from '../../models/liceomodel';


@Injectable()
export class LiceosService {
  /*
  Es el API de datos del liceos en la base de datos.
  */

  private liceos_collection: AngularFirestoreCollection<Liceomodel>;
  private liceos: Observable<Array<Liceomodel>>;

 constructor(public db: AngularFirestore) {
  this.liceos_collection = this.db.collection('Liceos');
  this.liceos = this.liceos_collection.valueChanges();
}

/*
obs(uid: string) {
  return this.liceos_collection.doc(uid).snapshotChanges();
}
*/
queryCreador(_id: string) {
  const lc = this.db.collection('Liceos', ref => ref.where('creador', '==', _id));
  // return lc.valueChanges();
  return lc.snapshotChanges()
    .map(arr => arr.map(snap => snap.payload.doc.data()));
}

saveLiceo(uid, liceo) {
  this.liceos_collection.doc(uid).set( Object.assign({}, liceo) )
    .then(success => console.log('SAVE', success))
    .catch(err => console.log('error en saveLiceo', err));
/*
  this.liceos_collection.doc(liceo.uid).set( (Object.assign({}, liceo)) )
    .then(success => console.log('SAVE', success))
    .catch(err => console.log('error en saveLiceo', err));
    */
}

/*
deleteLiceo(uid: string) {
  if (confirm('¿Eliminar Liceo?')) {
    this.liceos_collection.doc(uid).delete()
      .then(success => console.log('DELETE', success))
      .catch(err => console.log('error en deleteLiceo', err));
    }
}
*/

}
