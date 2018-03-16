import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Router } from '@angular/router';

import { LoginComponent } from './componentes/login/login.component';

import { AuthService } from './servicios/authservice/auth.service';
import { UserloggedService } from './servicios/userlogged/userlogged.service';
import { UserdataService } from './servicios/userdata/userdata.service';

import { MoliUser } from './models/moli-user';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthService, UserdataService, UserloggedService]
})
export class AppComponent implements OnInit {

  public title = 'MoLi';
  public loginActive = false;
  public user: MoliUser = new MoliUser();

  private authSubscription: Subscription;
  private userDataSubscription: Subscription;

  constructor (
    public router: Router,
    public authService: AuthService,
    public userLogged: UserloggedService, // Aquí solo escribimos en él con AuthService y UserdataService, pero no lo leemos
    public userData: UserdataService // Solo leemos para actualizar UserloggedService pero no escribimos
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
  }

  listenAutentication() {
    /* Siempre se escucha la autenticación de usuarios:
        Si es null: user y userLogged = new MoliUser()
        Si user:
            Si user.emailVerified:
                listenUserData()
            Si no user.emailVerified:
                user y userLogged = new MoliUser()
    */
    this.authSubscription = this.authService.obs()
      .subscribe(user => {
        // FIXME: Hay problemas si un nuevo usuario se autentica en la misma máquina?
        if (this.userDataSubscription) {
          // Al cambiar el usuario logueado, cambiamos la escucha en la base de datos
          this.userDataSubscription.unsubscribe();
        }

        if (user) {
          if (user.uid && user.emailVerified) {
            const tempUser: MoliUser = this.convertDataAuthToMoliUserData(user);
            this.userLogged.changeUser(tempUser);
            this.user = tempUser;
            this.listenUserData();
          }else {
            this.logout(); // Esto ejecuta de nuevo authSubscription pero sin user
          }
        }else {
          this.userLogged.changeUser(new MoliUser());
          this.user = new MoliUser();
        }

      });
    }

    listenUserData() {
      /*
      Con un usuario logueado y admitido, nos fijamos si está en la base de datos
        Si está en la base de datos:
            this.userLogged.changeUser(user);
            this.user = user;
        Si no está:
            Ir al perfil.
            Allí los datos iniciales siempre deben tomarse de userLogged,
      */
      this.userDataSubscription = this.userData.obs(this.user.uid)
        .subscribe( action => {
          if (action.payload.exists) {
            const tempuser = this.convertFirebaseDataToMoliUserData(action.payload.data());
            this.userLogged.changeUser(tempuser);
            this.user = tempuser;
          } else {
            const tempUser: MoliUser = this.convertFirebaseDataToAuthData(this.user);
            this.userLogged.changeUser(tempUser);
            this.user = tempUser;
            this.router.navigate(['/perfil']);
          }
        });
    }

  logout() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  convertDataAuthToMoliUserData (user: any) {
    const usertemp: MoliUser = new MoliUser();
    if (user) {
      const authUser = Object.assign({}, user);
      const { uid, displayName, photoURL, email, emailVerified, phoneNumber } = authUser;
      const providerId = authUser.providerData[0].providerId;
      usertemp.setMoliUser({
        uid, displayName, photoURL, email,
        emailVerified, phoneNumber, providerId });
    }
    return usertemp;
  }

  convertFirebaseDataToMoliUserData (user: any) {
    const usertemp: MoliUser = new MoliUser();
    usertemp.setMoliUser(user);
    return usertemp;
  }

  convertFirebaseDataToAuthData (user: MoliUser) {
    const usertemp: MoliUser = new MoliUser();
    if (user) {
      const { uid, displayName, photoURL, email, emailVerified, phoneNumber, providerId } = user;
      usertemp.setMoliUser({
        uid, displayName, photoURL, email,
        emailVerified, phoneNumber, providerId });
    }
    return usertemp;
  }

}
