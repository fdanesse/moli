import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-grupo',
  template: `
  <tr>
    <th scope="row">{{id}}</th>
    <td>
      <select class="custom-select" class="form-control"
        [(ngModel)]="reg[0]" (change)="changedNivel($event)">
        <option *ngFor='let n of niveles' value='{{n}}'>{{n}}</option>
      </select>
    </td>
    <td>
      <select class="custom-select" class="form-control"
        [(ngModel)]="reg[1]">
        <option *ngFor='let o of orientaciones' value='{{o}}'>{{o}}</option>
      </select>
    </td>
    <td>
      <span class="pull-right"
        data-toggle="tooltip" title="Eliminar" (click)='delete()'>
        <i class="fa fa-minus-circle" aria-hidden="true"></i>
      </span>
    </td>
  </tr>
  `,
  styles: [
    'input {max-length: 2;}',
    '.fa {cursor: pointer; font-size: 1.5em;}',
    '.fa-minus-circle {color: red;}',
    '.pull-right {margin: 3px;}']
})
export class GrupoComponent implements OnInit {

  @Input() registro: Array<string>;
  @Input() index: number;

  @Output() deleted = new EventEmitter<any>();

  public niveles = ['1º', '2º', '3º', '4º', '5º', '6º'];
  public orientaciones = [];

  public reg: Array<string>;
  public id: number;

  constructor() { }

  changedNivel(event) {
    this.setOrientaciones();
  }

  delete() {
    this.deleted.emit(this.id);
  }

  ngOnInit() {
    if (this.registro) {
      this.reg = this.registro;
      this.setOrientaciones();
    }
    if (this.index) {
      this.id = this.index;
    }
  }

  private setOrientaciones() {
    switch (this.reg[0]) {
      case '5º':
        this.orientaciones = ['Hum.', 'Cient.', 'Biol.', 'Art.'];
        break;
      case '6º':
        this.orientaciones = ['Art.', 'Der.', 'Ing.', 'Med.', 'Cont.', 'Arq.', 'Agro.'];
        break;
      default:
        this.orientaciones = ['1', '2', '3', '4', '5', '6', '7',
          '8', '9', '10', '11', '12', '13', '14', '15'];
        break;
    }
    if (this.orientaciones.indexOf(this.reg[1]) === -1) {
      this.reg[1] = this.orientaciones[0];
    }
  }

}
