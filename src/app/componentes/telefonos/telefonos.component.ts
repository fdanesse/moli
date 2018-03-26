import { Component, OnInit, Input } from '@angular/core';
import { TelefonoComponent } from './telefono.component';


@Component({
  selector: 'app-telefonos',
  template: `
  <app-telefono *ngFor='let registro of registros; index as idx'
    [tel]='registro' [index]='idx' (changed)='changedTelefono($event)'
    (deleted)='deletedTelefono($event)'>
  </app-telefono>
  `,
  styles: ['']
})
export class TelefonosComponent implements OnInit {

  @Input() registros: any;
  regs = [];

  constructor() { }

  deletedTelefono(id) {
    this.regs.splice(id, 1);
  }

  changedTelefono(params) {
    this.regs[params[0]] = params[1];
  }

  ngOnInit() {
    if (this.registros) {
      this.regs = this.registros;
    }
  }

}
