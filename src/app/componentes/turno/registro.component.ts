import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-registro',
  template: `
  <tr>
    <th scope="row">{{id}}</th>
    <td><input type="time" [(ngModel)]="reg[0]"></td>
    <td><input type="time" [(ngModel)]="reg[1]"></td>
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

  @Input() registro: Array<string>;
  @Input() index: number;

  @Output() deleted = new EventEmitter<any>();

  public reg: Array<string>;
  public id: number;

  constructor() { }

  ngOnInit() {
    if (this.registro) {
      this.reg = this.registro;
    }
    if (this.index) {
      this.id = this.index;
    }
  }

  delete() {
    this.deleted.emit(this.id);
  }
}
