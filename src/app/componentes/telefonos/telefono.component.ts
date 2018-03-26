import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-telefono',
  template: `
  <div>
    <span class="input-group-text"><i class="fa fa-phone-square"></i></span>
    <input class='form-control' type='text' maxlength="9" value={{tel}}
      placeholder='Telefonos' (change)='changedTelefono($event)'>
    <span class="pull-right"
      data-toggle="tooltip" title="Eliminar" (click)='deleteTelefono()'>
      <i class="fa fa-minus-circle" aria-hidden="true"></i>
    </span>
  </div>
  `,
  styles: [
    'div {margin: 0; margin-bottom: 3px; padding: 0;}',
    'div {display: -webkit-flex !important; display: flex !important; -webkit-flex-direction: row !important;}',
    'div {flex-direction: row !important; background-color: white;}',
    'div {border: 0.1em red; border-radius: 5px;}',
    'span {margin: 0; padding: 3px;}',
    '.fa-phone-square, .fa-home, .fa-user {color: green; cursor: auto;}',
    '.fa {cursor: pointer; font-size: 1.5em;}',
    '.fa-minus-circle {color: red;}',
    '.pull-right {margin: 3px;}',
    'input {margin: 0;}']
})
export class TelefonoComponent implements OnInit {

  @Input() tel: any;
  @Input() index: number;

  @Output() changed = new EventEmitter<any>();
  @Output() deleted = new EventEmitter<any>();

  constructor() { }

  changedTelefono (event) {
    this.tel = event.target.value;
    this.changed.emit([this.index, this.tel]);
  }

  deleteTelefono() {
    this.deleted.emit(this.index);
  }

  ngOnInit() {}

}
