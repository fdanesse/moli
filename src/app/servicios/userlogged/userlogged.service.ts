import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MoliUser } from '../../models/moli-user';


@Injectable()
export class UserloggedService {
  /*
  Mantiene los datos del usuario autenticado y logueado a través de changeUser(user),
  pero no tiene relación con los datos almacenados en la base de datos.
  */

  public user: MoliUser = new MoliUser();
  public _obs = new BehaviorSubject(this.user);
  obs = this._obs.asObservable();

  changeUser(user: MoliUser) {
    this._obs.next(user);
  }
}
