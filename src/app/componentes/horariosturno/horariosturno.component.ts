import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// https://medium.com/claritydesignsystem/ng-content-the-hidden-docs-96a29d70d11b


@Component({
  selector: 'app-horariosturno',
  template: `
  <table class="table table-sm table-striped table-dark table-bordered table-hover">
    <!--
    <thead>
      <tr>
        <th scope='col'>#</th>
        <th scope='col'>Inicio</th>
        <th scope='col'>Fin</th>
      </tr>
    </thead>
    -->
    <tbody>
      <ng-content></ng-content>
    </tbody>
  </table>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => HorariosturnoComponent),
      multi: true
    }
  ],
  styles: [
    'tbody {display: -webkit-flex !important;}',
    'tbody {display: flex !important;}',
    'tbody {-webkit-flex-direction: column !important;}',
    'tbody {flex-direction: column !important;}',
    'table {margin: 0px;padding: 0;}']
})
export class HorariosturnoComponent implements OnInit {

  private _model: Object;

  constructor() { }

  ngOnInit() {
  }

  writeValue(value: Object): void {
    this._model = value;
  }

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}

}
