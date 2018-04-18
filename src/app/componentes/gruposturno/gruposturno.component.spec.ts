import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposturnoComponent } from './gruposturno.component';

describe('GruposturnoComponent', () => {
  let component: GruposturnoComponent;
  let fixture: ComponentFixture<GruposturnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GruposturnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposturnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
