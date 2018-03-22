import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-registro',
  template: `
  <tr>
    <th scope="row">{{index}}</th>
    <td><input type="time" value='{{registro[0]}}' name="inicio" (change)='changedTime($event)'></td>
    <td><input type="time" value='{{registro[1]}}' name="fin" (change)='changedTime($event)'></td>
  </tr>
  `
})
export class RegistroComponent implements OnInit {

  @Input() registro: any;
  @Input() index: number;

  @Output() changed = new EventEmitter<any>();

  private inicio = '';
  private fin = '';

  constructor() { }

  changedTime(event) {
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

}
