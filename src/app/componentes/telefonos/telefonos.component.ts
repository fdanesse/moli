import { Component, OnInit, Input } from '@angular/core';
import { TelefonoComponent } from './telefono.component';


@Component({
  selector: 'app-telefonos',
  template: `
  <app-telefono *ngFor='let registro of registros; index as idx'
    [tel]='registro' [index]='idx' (changed)='changed($event)'
    (deleted)='deleted($event)'>
  </app-telefono>
  `
})
export class TelefonosComponent implements OnInit {

  @Input() registros: Array<string>;
  regs: Array<string>;

  constructor() { }

  deleted(id) {
    this.regs.splice(id, 1);
  }

  changed(params) {
    this.regs[params[0]] = params[1];
  }

  ngOnInit() {
    if (this.registros) {
      this.regs = this.registros;
    }
  }

}
