import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoraclaseComponent } from './horaclase.component';

describe('HoraclaseComponent', () => {
  let component: HoraclaseComponent;
  let fixture: ComponentFixture<HoraclaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoraclaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoraclaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
