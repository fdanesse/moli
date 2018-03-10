import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { UserloggedService } from '../../servicios/userlogged/userlogged.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: []
})
export class HomeComponent implements OnInit, OnDestroy {

  public user;
  public userSubscription: Subscription;

  constructor(
    public userLogged: UserloggedService
  ) { }

  ngOnInit() {
    // FIXME: Solo para probar su funcionamiento
    this.userSubscription = this.userLogged.obs.subscribe(res => {
      this.user = res;
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
