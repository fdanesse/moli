import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class UserloggedService {

  public user = null;

  public _obs = new BehaviorSubject(this.user);
  obs = this._obs.asObservable();

  constructor() {
  }

  changeUser(user: any) {
    this._obs.next(user);
  }
}
