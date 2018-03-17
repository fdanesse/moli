import { Component, OnInit, Input, Host } from '@angular/core';
import { MulticheckboxcontrollerComponent } from '../multicheckboxcontroller.component';

/*
@Host decorator nos permite obtener una referencia al componente padre.
Cuando se cambia la selección de la casilla de verificación, se llama al método toggleCheck(),
que agrega o elimina el valor en el componente de grupo.
El método isChecked() se enlaza a la propiedad [checked], por lo tanto,
si el valor del componente está en el modelo principal, entonces la casilla de verificación está marcada;
de lo contrario, no está marcada.
https://medium.com/@mihalcan/angular-multiple-check-boxes-45ad2119e115
*/


@Component({
  selector: 'app-checkbox',
  template: `
    <div class="checkbox" (click)="toggleCheck()">
      <input type="checkbox" [checked]="isChecked()"/>
      <ng-content></ng-content>
    </div>`,
  styles: ['.checkbox {margin: 5px; cursor: pointer; background-color: rgba(141, 110, 99, 0.1);}']
})
export class CheckboxComponent implements OnInit {

  @Input() value: any;

  constructor(@Host() private checkboxGroup: MulticheckboxcontrollerComponent) {}

  ngOnInit() {
  }

  toggleCheck() {
    this.checkboxGroup.addOrRemove(this.value);
  }

  isChecked() {
    return this.checkboxGroup.contains(this.value);
  }

}
