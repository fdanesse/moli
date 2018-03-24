import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; // Form

import { Liceomodel } from '../../models/liceomodel';

// https://www.concretepage.com/angular-2/angular-2-formgroup-example
// https://www.youtube.com/watch?v=WjcL09xgo3o

import { TurnoComponent } from '../../componentes/turno/turno.component';
import { GruposComponent } from '../../componentes/grupos/grupos.component';


@Component({
  selector: 'app-adminliceos',
  templateUrl: './adminliceos.component.html',
  styleUrls: ['./adminliceos.component.css']
})
export class AdminliceosComponent implements OnInit {

  public misliceos = ['Villa Rodriguez', 'Liceo Nº 3'];
  public liceo: Liceomodel = new Liceomodel();

  public turno1 = new FormControl('', []);
  public turno2 = new FormControl('', []);
  public turno3 = new FormControl('', []);

  public grupos1 = new FormControl('', []);
  public grupos2 = new FormControl('', []);
  public grupos3 = new FormControl('', []);

  public liceoForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    localidad: new FormControl('', [Validators.required]),
    departamento: new FormControl('', [Validators.required]),
    telefonos: new FormControl('', [Validators.required]),
    turno1: this.turno1, turno2: this.turno2, turno3: this.turno3,
    grupos1: this.grupos1, grupos2: this.grupos2, grupos3: this.grupos3
  });

  public identidad: FormGroup = new FormGroup({
    nombre: this.liceoForm.controls.nombre,
    direccion: this.liceoForm.controls.direccion,
    localidad: this.liceoForm.controls.localidad,
    departamento: this.liceoForm.controls.departamento,
    telefonos: this.liceoForm.controls.telefonos
  });

  constructor() {
  }

  changedLiceo(event) {
    console.log('Changed Liceo:', event.target.value);
  }

  deleteLiceo() {
    console.log('DeleteLiceo:');
  }

  addLiceo() {
    console.log('addLiceo:');
  }

  addHora(id: number) {
    switch (id) {
      case 1:
        this.liceo.turno1.push(['00:00', '00:45']);
        break;
      case 2:
        this.liceo.turno2.push(['00:00', '00:45']);
        break;
      case 3:
        this.liceo.turno3.push(['00:00', '00:45']);
        break;
    }
  }

  deleteHora(id: number) {
    switch (id) {
      case 1:
        this.liceo.turno1.pop();
        break;
      case 2:
        this.liceo.turno2.pop();
        break;
      case 3:
        this.liceo.turno3.pop();
        break;
    }
  }

  addGrupo(id: number) {
    switch (id) {
      case 1:
        this.liceo.grupos1.push(['1º', '1']);
        break;
      case 2:
        this.liceo.grupos2.push(['1º', '1']);
        break;
      case 3:
        this.liceo.grupos3.push(['1º', '1']);
        break;
    }
  }

  deleteGrupo(id: number) {
    switch (id) {
      case 1:
        this.liceo.grupos1.pop();
        break;
      case 2:
        this.liceo.grupos2.pop();
        break;
      case 3:
        this.liceo.grupos3.pop();
        break;
    }
  }

  ngOnInit() {
    this.liceoForm.setValue(this.liceo);
  }

  save() {}
}
