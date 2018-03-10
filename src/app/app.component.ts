import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

// import { Router } from '@angular/router';

import { LoginComponent } from './componentes/login/login.component';

import { AuthService } from './servicios/authservice/auth.service';


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

  constructor (
    // public router: Router
    public authService: AuthService
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

    this.autenticacion = this.authService.exportAuth().subscribe(user => {
      this.user = user;
      // console.log('AuthUser:', this.user);
      if (this.user) {
        console.log('LOGIN:', this.user);
        /*
        FIXME: Observable de usuario en la base
        */
      } else {
        console.log('LOGOUT:', this.user);
        /*
        FIXME: Desubscripcion al Observable de usuario en la base
        */
        // this.router.navigate(['/home']);
      }
    });

  }

  logout() {
    this.authService.logout();
  }

}
