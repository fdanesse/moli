import { Component, forwardRef, Input, OnInit, Host } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { GrssComponent } from './grss.component';

@Component({
  selector: 'app-grs',
  template: `
    <div>
      <input type='time' [(ngModel)]='_model[0]'/>
      <input type='time' [(ngModel)]='_model[1]'/>
      <ng-content></ng-content>
    </div>
    `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GrsComponent),
      multi: true
    }
  ]
})
export class GrsComponent implements OnInit, ControlValueAccessor {

  @Input() index: number;
  @Input() value: Array<string>;

  public _model: Array<string>;

  constructor(@Host() private grss: GrssComponent) { }

  ngOnInit() {
    this._model = this.value;
    console.log('GrsComponent ngOnInit:', this._model);
  }

  writeValue(value: Array<string>): void {
    this._model = value;
    console.log('GrsComponent writeValue:', value);
  }

  registerOnChange(fn: any): void {}

  registerOnTouched(fn: any): void {}
}
