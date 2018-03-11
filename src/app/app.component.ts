import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

// import { Router } from '@angular/router';

import { LoginComponent } from './componentes/login/login.component';

import { AuthService } from './servicios/authservice/auth.service';
import { UserloggedService } from './servicios/userlogged/userlogged.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService]
})
export class AppComponent implements OnInit {

  public title = 'MoLi';
  public loginActive = false;
  public user: any;

  private autenticacion: Subscription;
  private userSubscription: Subscription;

  constructor (
    // public router: Router
    public authService: AuthService,
    public userLogged: UserloggedService
  ) {}

  toggleLoginActive(event) {
    this.loginActive = !this.loginActive;
    // http://www.developphp.com/video/JavaScript/Start-Stop-CSS-keyframes-animation-with-JavaScript
    const login = document.getElementById('login'); // document.querySelector('login');
    if (this.loginActive) {
      login.style.animation = 'in 0.3s both';
    } else {
      login.style.animation = 'out 0.3s both';
    }
  }

  actualizarCopyRigth() {
    const footer = document.body.getElementsByClassName('navbar-text')[0];
    const d = new Date();
    footer.innerHTML = footer.innerHTML.replace('2018', d.getFullYear() + '');
  }

  ngOnInit() {
    this.actualizarCopyRigth();
    this.listenLogin();
    this.listenAutentication();
  }

  listenLogin() {
    this.userSubscription = this.userLogged.obs.subscribe(user => {
      this.user = user;
      if (this.user) {
        /*
        if (user.emailVerified) {
            //FIXME: Observable de usuario en la base
          const authUser = Object.assign({}, user);
          const { uid, displayName, photoURL, email, emailVerified, phoneNumber } = authUser;
          const providerId = authUser.providerData[0].providerId;
          // const usertemp: MoliUser = new MoliUser();
          // usertemp.setMoliUser({ uid, displayName, photoURL, email, emailVerified, phoneNumber, providerId });
          // this.setUserFromDataBase(usertemp);
        } else {
          confirm('Su email no está validado por el proveedor');
          this.logout();
        }
        */
      }else {
        // FIXME: Desubscripcion al Observable de usuario en la base
        // this.router.navigate(['/home']);
      }
    });
  }

  listenAutentication() {
    this.autenticacion = this.authService.obs()
      .subscribe(user => this.userLogged.changeUser(user));
  }

  logout() {
    this.authService.logout();
    // this.router.navigate(['/home']);
  }

}
