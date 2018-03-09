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
  user: any;

  constructor (
    // public router: Router
  ) {}

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
