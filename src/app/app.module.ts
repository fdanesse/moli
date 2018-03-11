import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './componentes/login/login.component';

import { AuthService } from './servicios/authservice/auth.service';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { environment } from '../environments/environment';

import { UserloggedService } from './servicios/userlogged/userlogged.service';

import { UserdataService } from './servicios/userdata/userdata.service';
import { AngularFirestoreModule } from 'angularfire2/firestore';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),

    AngularFirestoreModule
  ],
  providers: [AuthService, UserloggedService, UserdataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
