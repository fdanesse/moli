import { Component, OnInit } from '@angular/core';

// import { Router } from '@angular/router';

import { LoginComponent } from './views/home/login/login.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MoLi';
  loginActive = false;
  user: any;

  constructor (
    // public router: Router
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
  }

  logout() {
    console.log('logout');
  }

}
