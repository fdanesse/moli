import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'; // Form

import { Liceomodel } from '../../models/liceomodel';

// https://www.concretepage.com/angular-2/angular-2-formgroup-example
// https://www.youtube.com/watch?v=WjcL09xgo3o

import { TurnoComponent } from '../../componentes/turno/turno.component';


@Component({
  selector: 'app-adminliceos',
  templateUrl: './adminliceos.component.html',
  styleUrls: ['./adminliceos.component.css']
})
export class AdminliceosComponent implements OnInit {

  public liceo: Liceomodel = new Liceomodel();

  public turno1 = new FormControl('', [Validators.required]);
  public turno2 = new FormControl('', [Validators.required]);
  public turno3 = new FormControl('', [Validators.required]);

  public liceoForm: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),
    localidad: new FormControl('', [Validators.required]),
    departamento: new FormControl('', [Validators.required]),
    turno1: this.turno1, turno2: this.turno2, turno3: this.turno3
  });

  constructor() {
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

  ngOnInit() {
    this.liceoForm.setValue(this.liceo);
  }

  save() {}
}
