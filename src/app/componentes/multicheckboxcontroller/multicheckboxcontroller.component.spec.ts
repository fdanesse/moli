import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MulticheckboxcontrollerComponent } from './multicheckboxcontroller.component';

describe('MulticheckboxcontrollerComponent', () => {
  let component: MulticheckboxcontrollerComponent;
  let fixture: ComponentFixture<MulticheckboxcontrollerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MulticheckboxcontrollerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MulticheckboxcontrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
