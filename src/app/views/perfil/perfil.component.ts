import { Component, OnInit, OnDestroy } from '@angular/core';
import { MoliUser } from '../../models/moli-user';

import { Subscription } from 'rxjs/Subscription';

import { CheckboxComponent } from '../../componentes/multicheckboxcontroller/checkbox/checkbox.component';
import { MulticheckboxcontrollerComponent } from '../../componentes/multicheckboxcontroller/multicheckboxcontroller.component';
import { RolesService } from '../../servicios/roles/roles.service';

import { FormGroup, FormControl, Validators, Form } from '@angular/forms';

import { UserloggedService } from '../../servicios/userlogged/userlogged.service';
import { UserdataService } from '../../servicios/userdata/userdata.service';

import { AuthService } from '../../servicios/authservice/auth.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [RolesService, UserdataService]
})
export class PerfilComponent implements OnInit, OnDestroy {

  private rolesSubscription: Subscription;
  private loginSubscription: Subscription;

  public rolesModel: string[] = [];
  public user: MoliUser = new MoliUser(); // Datos que se van a almacenar.

  /* Comienza con una palabra de entre 3 y 15 caracteres, pueden seguir con varias palabras
  de 2 a 15 caracteres cada una, pero nunca tendrá mñas de un espacio entre ellas y
  siempre termina en una letra, no se aceptan números, permite ñ y tildes.*/
  private names_pattern = '^[a-zA-ZÁ-Úá-ú]{2,15}( ?[a-zA-ZÁ-Úá-ú]{1,15})*[a-zA-ZÁ-Úá-ú]+$';
  /* 8 caracteres numéricos */
  private ci_pattern = '[0-9]{8}';
  /* 3 letras mayúsculas, un espacio y 4 cifras. */
  private credencial_pattern = '[A-Z]{3} [0-9]{4}$';
  /* Nº de 4 cifras */
  private ncobro_pattern = '^[0-9]{4}$';
  /* Nº de 9 cifras */
  private telefonos_pattern = '^[0-9]{8,9}$';

  public perfilForm: FormGroup;

  constructor(
    public authService: AuthService, // Solo para logout al borrar el usuario
    private rolesService: RolesService,
    public userLogged: UserloggedService,
    public userData: UserdataService
  ) { }

  ngOnInit() {
    this.settingFormsConstrols();
    this.setRoles();
    this.listenLogin();
  }

  ngOnDestroy() {
    this.rolesSubscription.unsubscribe();
    /*
    Solo queremos los datos iniciales por eso nos desubscribimos al recibirlos y no aqui.
      this.loginSubscription.unsubscribe();
    */
  }

  settingFormsConstrols() {
    // https://angular.io/guide/reactive-forms
    // https://angular.io/guide/form-validation
    // https://angular.io/api/forms/AbstractControl

    // https://angular.io/api/forms/RadioControlValueAccessor
    // https://angular.io/api/forms/SelectControlValueAccessor
    // https://angular.io/api/forms/CheckboxControlValueAccessor
    this.perfilForm = new FormGroup({
      /* auth user data */
      photoURL: new FormControl('', [Validators.required]),
      uid: new FormControl('', [Validators.required]),
      displayName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      emailVerified: new FormControl('', [Validators.pattern('true')]),
      phoneNumber: new FormControl('', [
        Validators.pattern(this.telefonos_pattern) || null]),
      providerId: new FormControl('', [Validators.required]),

      /* personal user data */
      nombre: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(this.names_pattern)]),
      apellido: new FormControl('', [
        Validators.required,
        Validators.maxLength(20),
        Validators.pattern(this.names_pattern)]),
      ci: new FormControl('', [
        Validators.required,
        Validators.pattern(this.ci_pattern)]),
      credencial: new FormControl('', [
        Validators.pattern(this.credencial_pattern) || null]),
      direccion: new FormControl('', [Validators.maxLength(30)]),
      telefono: new FormControl('', [
        Validators.pattern(this.telefonos_pattern) || null]),

      /* laboral data */
      ncobro: new FormControl('', [
        Validators.required,
        Validators.pattern(this.ncobro_pattern)]),
      roles: new FormControl('', [Validators.required])
    });
  }

  setRoles() {
    /*
    FIXME: hay un error: los roles se actualizan en app.component
      Esto debiera suceder solo si se guardan los datos en la base de datos
    */
    this.rolesSubscription = this.rolesService.obs()
      .subscribe(data => {
        if (data) {
          this.rolesModel = [];
          for (const _doc of data) {
            this.rolesModel.push(_doc.Rol);
          }
        }
    });
  }

  listenLogin() {
    this.loginSubscription = this.userLogged.obs.subscribe(user => {
      this.user = Object.assign({}, user);
      // La primera vez, user estará vacío, la segunda vez nos desubscribimos
      if (this.loginSubscription) {
        this.loginSubscription.unsubscribe();
      }
    });
  }

  save() {
    // Reglas en firebase:
    // https://firebase.google.com/docs/firestore/security/secure-data?hl=es-419
    // https://firebase.google.com/docs/firestore/reference/security/?hl=es-419#properties
    // && get(/databases/$(database)/documents/usuarios/$(userId)).data.uid == userId
    if (this.perfilForm.valid) {
      this.userData.saveUser(this.user);
      // this.userLogged.changeUser(this.user); No debe hacerse, está automatizado en app.component
      // FIXME: Avisar de datos almacenados.
      // this.usersService.updateUser(this.dbuser.uid, this.dbuser);
      // this.router.navigate(['/home']);
    }
  }

  delete() {
    /*
    FIXME: Al borrar el usuario, se actualizará userDataSubscription en app.component,
      lo cual llamaŕa al perfil nuevamente.
      Los datos del viejo usuario quedarán en userlogged dando la impresión
      de que el usuario aun existe en la base de datos cuando en realidad solo está logueado,
      por eso es necesario actualizar userLogged
    */
    this.userData.deleteUser(this.user.uid);
  }

}
