import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-email',
  template: `
  <div>
    <span class="input-group-text"><i class="fa fa-at"></i></span>
    <input class='form-control' type='text' maxlength="30" value={{email}}
      placeholder='Email' (change)='changedEmail($event)'>
    <span class="pull-right"
      data-toggle="tooltip" title="Eliminar" (click)='deleteEmail()'>
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
    '.fa-at, .fa-home {color: green; cursor: auto;}',
    '.fa {cursor: pointer; font-size: 1.5em;}',
    '.fa-minus-circle {color: red;}',
    '.pull-right {margin: 3px;}',
    'input {margin: 0;}']
})
export class EmailComponent implements OnInit {

  @Input() email: string;
  @Input() index: number;

  @Output() changed = new EventEmitter<any>();
  @Output() deleted = new EventEmitter<any>();

  constructor() { }

  changedEmail (event) {
    this.email = event.target.value;
    this.changed.emit([this.index, this.email]);
  }

  deleteEmail() {
    this.deleted.emit(this.index);
  }

  ngOnInit() {}

}
