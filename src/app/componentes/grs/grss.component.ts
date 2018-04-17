import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';


@Component({
  selector: 'app-grss',
  template: `<ng-content></ng-content>`,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GrssComponent),
      multi: true
    }
  ]
})
export class GrssComponent implements OnInit, ControlValueAccessor {

  private _model: Object;

  constructor() { }

  ngOnInit() {
  }

  writeValue(value: any): void {
    this._model = value;
  }

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}
}
