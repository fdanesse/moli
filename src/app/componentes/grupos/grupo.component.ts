import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-grupo',
  template: `
  <tr>
    <th scope="row">{{index}}</th>
    <td>
      <select class="custom-select" class="form-control"
          (change)="changedNivel($event)">
        <option *ngFor='let n of niveles' value='{{n}}'
          [selected]='n==nivel'>{{n}}</option>
      </select>
    </td>
    <td>
      <select class="custom-select" class="form-control"
          (change)="changedOrientacion($event)">
        <option *ngFor='let o of orientaciones' value='{{o}}'
          [selected]='o==orientacion'>{{o}}</option>
      </select>
    </td>
  </tr>
  `,
  styles: ['input {max-length: 2;}']
})
export class GrupoComponent implements OnInit {

  @Input() registro: any;
  @Input() index: number;

  @Output() changed = new EventEmitter<any>();

  public niveles = ['1º', '2º', '3º', '4º', '5º', '6º'];
  public orientaciones = [];
  public nivel = '';
  public orientacion = '';

  constructor() { }

  changedNivel(event) {
    this.nivel = event.target.value;
    switch (this.nivel) {
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
    this.orientacion = this.orientaciones[0];
    this.changed.emit([this.index, this.nivel, this.orientacion]);
  }

  changedOrientacion(event) {
    this.orientacion = event.target.value;
    this.changed.emit([this.index, this.nivel, this.orientacion]);
  }

  ngOnInit() {
    if (this.registro) {
      this.nivel = this.registro[0];
      switch (this.nivel) {
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
      this.orientacion = this.registro[1];
    }
  }

}
