import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-telefono',
  template: `
  <div>
    <span class="input-group-text"><i class="fa fa-phone-square"></i></span>
    <input class='form-control' type='text' maxlength="9" value={{tel}}
      placeholder='Telefono' (change)='change($event)'>
    <span class="pull-right"
      data-toggle="tooltip" title="Eliminar" (click)='delete()'>
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
    '.fa-phone-square, .fa-home {color: green; cursor: auto;}',
    '.fa {cursor: pointer; font-size: 1.5em;}',
    '.fa-minus-circle {color: red;}',
    '.pull-right {margin: 3px;}',
    'input {margin: 0;}',
    '.alert {padding: 5px; margin-top: 3px;}',
    '.alert > p {margin: 0;}']
})
export class TelefonoComponent implements OnInit {

  @Input() tel: string;
  @Input() index: number;

  @Output() changed = new EventEmitter<any>();
  @Output() deleted = new EventEmitter<any>();

  private telefonos_pattern = '^[0-9]{8,9}$';
  public valid = null;

  constructor() { }

  change (event) {
    this.valid = event.target.value.match(this.telefonos_pattern);
    if (this.valid) {
      this.tel = event.target.value;
      this.changed.emit([this.index, this.tel]);
    }else {
      event.target.value = '';
    }
  }

  delete() {
    this.deleted.emit(this.index);
  }

  ngOnInit() {}

}
