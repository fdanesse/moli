import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

// import {AngularFireAuth} from 'angularfire2/auth';
import { AuthService } from '../servicios/authservice/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
      private router: Router,
      // private afAuth: AngularFireAuth,
      private authService: AuthService
      ) {}

    canActivate(
      // https://codecraft.tv/courses/angular/routing/router-guards/
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authService.afAuth.authState
        .take(1)
        .map(authState => !! authState)
        .do(authenticated => {
          if (!authenticated) {
            window.alert('No tienes permisos para acceder a esta dirección.');
            this.router.navigate(['/home']);
          }
        });
    }
}
