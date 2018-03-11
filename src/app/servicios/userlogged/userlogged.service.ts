import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MoliUser } from '../../models/moli-user';


@Injectable()
export class UserloggedService {
  public user: MoliUser = null;
  public _obs = new BehaviorSubject(this.user);
  obs = this._obs.asObservable();

  changeUser(user: MoliUser) {
    this._obs.next(user);
  }
}
