import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorariosturnoComponent } from './horariosturno.component';

describe('HorariosturnoComponent', () => {
  let component: HorariosturnoComponent;
  let fixture: ComponentFixture<HorariosturnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorariosturnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorariosturnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
