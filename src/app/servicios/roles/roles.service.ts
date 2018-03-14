import { Injectable } from '@angular/core';
import { AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class RolesService {

  private roles_collection: AngularFirestoreCollection<any>;

  constructor(public db: AngularFirestore) {
    this.roles_collection = this.db.collection('Roles');
  }

  obs() {
    /*
    Un error de firebase:
      Observable<DocumentChangeAction[]> for collections
      Observable<DocumentChangeAction> for documents
    */
    // return this.roles_collection.snapshotChanges();
    return this.roles_collection.valueChanges();
  }
}
