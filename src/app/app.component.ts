import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

// import { Router } from '@angular/router';

import { LoginComponent } from './componentes/login/login.component';

import { AuthService } from './servicios/authservice/auth.service';
import { UserloggedService } from './servicios/userlogged/userlogged.service';
import { UserdataService } from './servicios/userdata/userdata.service';

import { MoliUser } from './models/moli-user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService, UserdataService]
})
export class AppComponent implements OnInit {

  public title = 'MoLi';
  public loginActive = false;
  public user: any;

  private autenticacion: Subscription;
  private loginSubscription: Subscription;
  private userDataSubscription: Subscription;

  constructor (
    // public router: Router
    public authService: AuthService,
    public userLogged: UserloggedService,
    public userData: UserdataService
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
    /**
     * listenAutentication:
     *    Cuando El usuario se autentica, se convierten los datos al tipo MoliUser,
     *    y se actualizan los datos en el servicio userLogged, entonces:
     * listenLogin:
     *    si no emailVerified, logout()
     *    si emailVerified:
     * listenUserData:
     *    miramos este user.uid desde la base de datos.
     */
    this.actualizarCopyRigth();
    this.listenLogin();
    this.listenAutentication();
  }

  listenLogin() {
    this.loginSubscription = this.userLogged.obs.subscribe(user => {
      if (this.userDataSubscription) {
        this.userDataSubscription.unsubscribe();
      }
      this.user = user;
      if (this.user) {
        if (!this.user.emailVerified) {
          this.logout();
          confirm('Su email no está validado por el proveedor');
        }else {
          this.listenUserData();
        }

      }
    });
  }

  listenUserData() {
    const uid = this.user.uid;
    this.userDataSubscription = this.userData.obs(uid)
      .subscribe( action => {
        const cuentaExiste = action.payload.exists;
        if (cuentaExiste) {
          this.user = action.payload.data();
          // this.router.navigate(['/home']);
        } else {
          // this.userData.saveUser(this.user); FIXME: Para tener datos iniciales
          // this.router.navigate(['/perfil']);
        }
      });
  }

  listenAutentication() {
    this.autenticacion = this.authService.obs()
      .subscribe(user => {
        const _user = this.convertUserData(user);
        this.userLogged.changeUser(_user);
      });
    }

  convertUserData (user: any) {
    const authUser = Object.assign({}, user);
    const { uid, displayName, photoURL, email, emailVerified, phoneNumber } = authUser;
    // const providerId = authUser.providerData[0].providerId;
    const usertemp: MoliUser = new MoliUser();
    usertemp.setMoliUser({
      uid, displayName, photoURL, email,
      emailVerified, phoneNumber }); // , providerId });
    return usertemp;
  }

  logout() {
    this.authService.logout();
    // this.router.navigate(['/home']);
  }

}
