import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-registro',
  template: `
  <tr>
    <th scope="row">{{index}}</th>
    <td><input type="time" value='{{registro[0]}}'
      name="inicio" (change)='change($event)'></td>
    <td><input type="time" value='{{registro[1]}}'
      name="fin" (change)='change($event)'></td>
    <td>
      <span class="pull-right"
        data-toggle="tooltip" title="Eliminar" (click)='delete()'>
        <i class="fa fa-minus-circle" aria-hidden="true"></i>
      </span>
    </td>
  </tr>
  `,
  styles: [
    '.fa {cursor: pointer; font-size: 1.5em;}',
    '.fa-minus-circle {color: red;}',
    '.pull-right {margin: 3px;}']
})
export class RegistroComponent implements OnInit {

  @Input() registro: any;
  @Input() index: number;

  @Output() changed = new EventEmitter<any>();
  @Output() deleted = new EventEmitter<any>();

  private inicio = '';
  private fin = '';

  constructor() { }

  change(event) {
    switch (event.target.name) {
      case 'inicio':
        this.inicio = event.target.value;
        break;
      case 'fin':
        this.fin = event.target.value;
        break;
    }
    this.changed.emit([this.index, this.inicio, this.fin]);
  }

  ngOnInit() {
    if (this.registro) {
      this.inicio = this.registro[0];
      this.fin = this.registro[1];
    }
  }

  delete() {
    this.deleted.emit(this.index);
  }
}
