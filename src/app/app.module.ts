import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AuthGuard } from './guardianes/auth.guard';

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

import { PerfilComponent } from './views/perfil/perfil.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RolesService } from './servicios/roles/roles.service';
import { MulticheckboxcontrollerComponent } from './componentes/multicheckboxcontroller/multicheckboxcontroller.component';
import { CheckboxComponent } from './componentes/multicheckboxcontroller/checkbox/checkbox.component';
import { NotfoundComponent } from './views/notfound/notfound.component';

import { AdminliceosComponent } from './views/adminliceos/adminliceos.component';
import { TurnoComponent } from './componentes/turno/turno.component';
import { RegistroComponent } from './componentes/turno/registro.component';
import { GruposComponent } from './componentes/grupos/grupos.component';
import { GrupoComponent } from './componentes/grupos/grupo.component';
import { TelefonosComponent } from './componentes/telefonos/telefonos.component';
import { TelefonoComponent } from './componentes/telefonos/telefono.component';
import { EmailsComponent } from './componentes/emails/emails.component';
import { EmailComponent } from './componentes/emails/email.component';

import { LiceosService } from './servicios/liceos/liceos.service';

// https://hassantariqblog.wordpress.com/2016/10/12/angular2-template-parse-errors-add-custom_elements_schema-to-the-ngmodule-schemas/


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PerfilComponent,
    MulticheckboxcontrollerComponent,
    CheckboxComponent,
    NotfoundComponent,
    AdminliceosComponent,

    TurnoComponent,
    RegistroComponent,
    GruposComponent,
    GrupoComponent,
    TelefonosComponent,
    TelefonoComponent,
    EmailsComponent,
    EmailComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),

    AngularFirestoreModule,

    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthService, UserloggedService, UserdataService, RolesService,
    AuthGuard, LiceosService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
