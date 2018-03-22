import { Component, OnInit, Input } from '@angular/core';
import { RegistroComponent } from '../turno/registro.component';


@Component({
  selector: 'app-turno',
  template: `
    <table class="table table-sm table-striped table-dark table-bordered table-hover">
      <!--
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Inicio</th>
          <th scope="col">Fin</th>
        </tr>
      </thead> FIXME: Por algún motivo, los campos no se alinean con la cabecera
      -->
      <tbody>
        <app-registro *ngFor='let registro of registros; index as idx'
          [registro]='registro' [index]='idx+1' (changed)="changedTime($event)">
        </app-registro>
      </tbody>
    </table>
  `,
  styles: ['tbody {display: -webkit-flex !important;display: flex !important;-webkit-flex-direction: column !important;flex-direction: column !important;}',
  'app-registro {margin:3px;}', 'table{margin: 0px;padding: 0;}']
})
export class TurnoComponent implements OnInit {

  @Input() registros: any;
  regs = [];

  constructor() { }

  changedTime(event) {
    this.regs[event[0] - 1] = [event[1], event[2]];
  }

  ngOnInit() {
    if (this.registros) {
      this.regs = this.registros;
    }
  }

}
