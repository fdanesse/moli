import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

/*
Un componente de grupo que contenga ngModel o formControlName y luego componentes secundarios
(casillas de verificación), que actualizan el valor del componente de grupo.
Los métodos writeValue, registerOnChange y registerOnTouched son la implementación de la
interfaz ControlValueAccessor. _model se usa para almacenar el valor interno.
set() es un método de ayuda para establecer el valor inicial.
Se llama al método addOrRemove cuando nuestra casilla hija cambia su selección.
Si el valor de la casilla de verificación ya está en el modelo, quítelo, de lo contrario,
agréguelo a nuestro _modelo. Los métodos contains() simplemente verifican si el valor está en el modelo.
Cuando se cambia el valor _model, llamamos a this.onChange para notificar a Angular sobre los cambios.
https://medium.com/@mihalcan/angular-multiple-check-boxes-45ad2119e115
*/


@Component({
  selector: 'app-multicheckboxcontroller',
  template: `<ng-content></ng-content>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MulticheckboxcontrollerComponent),
      multi: true
    }
  ]
})
export class MulticheckboxcontrollerComponent implements OnInit, ControlValueAccessor {

  private _model: any;
  private onChange: (m: any) => void;
  private onTouched: (m: any) => void;

  constructor() { }

  ngOnInit() {
  }

  get model() {
    return this._model;
  }

  writeValue(value: any): void {
    this._model = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  set(value: any) {
    this._model = value;
    this.onChange(this._model);
  }

  addOrRemove(value: any) {
    if (this.contains(value)) {
      this.remove(value);
    } else {
      this.add(value);
    }
  }

  contains(value: any): boolean {
    if (this._model instanceof Array) {
      return this._model.indexOf(value) > -1;
    } else if (!!this._model) {
      return this._model === value;
    }
    return false;
  }

  private add(value: any) {
    if (!this.contains(value)) {
      if (this._model instanceof Array) {
        this._model.push(value);
      } else {
        this._model = [value];
      }
      this.onChange(this._model);
    }
  }

  private remove(value: any) {
    const index = this._model.indexOf(value);
    if (!this._model || index < 0) {
      return;
    }
    this._model.splice(index, 1);
    this.onChange(this._model);
  }

}
