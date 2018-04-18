import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-horaclase',
  template: `
  <tr>
    <th scope='row'>{{index}}</th>
    <td><input type='time' [(ngModel)]='_model[0]'/></td>
    <td><input type='time' [(ngModel)]='_model[1]'/></td>
    <td>
      <span class='pull-right'
        data-toggle='tooltip' title='Eliminar' (click)='eliminar()'>
        <i class='fa fa-minus-circle' aria-hidden='true'></i>
      </span>
    </td>
    <ng-content></ng-content>
  </tr>
    `,
  styles: [
    '.fa {cursor: pointer; font-size: 1.5em;}',
    '.fa-minus-circle {color: red;}',
    '.pull-right {margin: 3px;}']
})
export class HoraclaseComponent implements OnInit {

  @Input() value: Array<string>;
  @Input() index: number;

  @Output() quitar = new EventEmitter<number>();

  public _model: Array<string>;

  constructor() { }

  ngOnInit() {
    this._model = this.value;
  }

  eliminar() {
    this.quitar.next(this.index);
  }
}

