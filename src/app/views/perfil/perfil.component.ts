import { Component, OnInit, OnDestroy } from '@angular/core';
import { MoliUser } from '../../models/moli-user';

import { Subscription } from 'rxjs/Subscription';

import { CheckboxComponent } from '../../componentes/multicheckboxcontroller/checkbox/checkbox.component';
import { MulticheckboxcontrollerComponent } from '../../componentes/multicheckboxcontroller/multicheckboxcontroller.component';
import { RolesService } from '../../servicios/roles/roles.service';

import { FormGroup, FormControl, Validators, Form } from '@angular/forms';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
  providers: [RolesService]
})
export class PerfilComponent implements OnInit, OnDestroy {

  private rolesSubscription: Subscription;

  public rolesModel: string[] = [];
  public user: MoliUser = new MoliUser();

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
    private rolesService: RolesService
  ) { }

  ngOnInit() {
    this.settingFormsConstrols();
    this.setRoles();
  }

  ngOnDestroy() {
    this.rolesSubscription.unsubscribe();
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

  save() {
    console.log('SAVE');
  }

  delete() {
    console.log('DELETE');
  }

}
