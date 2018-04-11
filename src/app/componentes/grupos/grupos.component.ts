import { Component, OnInit, Input } from '@angular/core';
import { GrupoComponent } from './grupo.component';


@Component({
  selector: 'app-grupos',
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
      <app-grupo *ngFor='let key of Object.keys(registros)'
        [registro]='registros[key]' [index]='key'
        (changed)='changed($event)' (deleted)="deleted($event)">
      </app-grupo>
    </tbody>
  </table>
  `,
  styles: ['tbody {display: -webkit-flex !important;display: flex !important;-webkit-flex-direction: column !important;flex-direction: column !important;}',
  'app-registro {margin:3px;}', 'table{margin: 0px;padding: 0;}']
})
export class GruposComponent implements OnInit {

  @Input() registros: Object;
  regs = {};
  Object = Object;

  constructor() { }

  changed(event) {
    this.regs[event[0]] = [event[1], event[2]];
  }

  deleted(id) {
    delete this.regs[id];
  }

  ngOnInit() {
    if (this.registros) {
      this.regs = this.registros;
    }
  }

}
