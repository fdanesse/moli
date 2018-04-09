import { Injectable } from '@angular/core';
import { AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { jsonEval } from '@firebase/util';


@Injectable()
export class LiceosService {
  /*
  Es el API de datos del liceos en la base de datos.
  */

 private liceos_collection: AngularFirestoreCollection<any>;

 constructor(public db: AngularFirestore) {
  this.liceos_collection = this.db.collection('Liceos');
}

/*
obs(uid: string) {
  return this.liceos_collection.doc(uid).snapshotChanges();
}
*/

saveLiceo(liceo) {
  this.liceos_collection.doc('0').set( Object.assign({}, liceo) )
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
