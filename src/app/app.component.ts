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
  public user: MoliUser = new MoliUser();

  private authSubscription: Subscription;
  private loginSubscription: Subscription;
  private userDataSubscription: Subscription;

  public info_print;

  constructor (
    // public router: Router
    public authService: AuthService,
    public userLogged: UserloggedService,
    public userData: UserdataService
  ) {}

  toggleLoginActive() {
    this.loginActive = !this.loginActive;
    // http://www.developphp.com/video/JavaScript/Start-Stop-CSS-keyframes-animation-with-JavaScript
    const login = document.getElementById('login'); // document.querySelector('login');
    if (this.loginActive) {
      login.style.animation = 'in 0.5s both';
    } else {
      login.style.animation = 'out 0.5s both';
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
    this.listenAutentication();
    this.listenLogin();

    this.info_print = {
      Browser_CodeName: navigator.appCodeName,
      Browser_Name: navigator.appName,
      Browser_Version: navigator.appVersion,
      Cookies_Enabled: navigator.cookieEnabled,
      Browser_Language: navigator.language,
      Browser_Online: navigator.onLine,
      Platform: navigator.platform,
      User_agent_header1: navigator.userAgent,
      User_agent_header2: navigator.product };
  }

  listenLogin() {
    this.loginSubscription = this.userLogged.obs.subscribe(user => {
      if (this.userDataSubscription) {
        this.userDataSubscription.unsubscribe();
      }
      this.user = user;
      if (this.user.uid && !this.user.emailVerified) {
        this.logout();
        alert('Su email no fue validado por el proveedor');
      }else if (this.user.uid && this.user.emailVerified) {
        this.listenUserData();
      }else {
        this.logout();
      }
    });
  }

  listenUserData() {
    this.userDataSubscription = this.userData.obs(this.user.uid)
      .subscribe( action => {
        if (action.payload.exists) {
          this.userLogged.changeUser(
            this.convertUserData(action.payload.data())
          );
          // this.router.navigate(['/home']);
        } else {
          // this.userData.saveUser(this.user); // FIXME: Para tener datos iniciales
          this.userLogged.changeUser(
            this.convertUserData({})
          );
          // this.router.navigate(['/perfil']);
        }
      });
  }

  listenAutentication() {
    this.authSubscription = this.authService.obs()
      .subscribe(user => {
        this.userLogged.changeUser(
          this.convertUserData(user)
        );
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
