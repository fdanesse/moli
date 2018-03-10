import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../servicios/authservice/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit() {
  }

  onLogin(provider: string) {
    this.authService.login(provider)
      .then( (user) => {
        if (user) {
          const uid = user.user.uid;
          console.log('LOGIN:', uid);
        }
      })
      .catch( (err) => {
        console.log('ERROR:', err);
      });
    }

}
