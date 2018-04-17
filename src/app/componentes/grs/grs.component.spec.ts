import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrsComponent } from './grs.component';

describe('GrsComponent', () => {
  let component: GrsComponent;
  let fixture: ComponentFixture<GrsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
