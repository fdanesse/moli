import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminliceosComponent } from './adminliceos.component';

describe('AdminliceosComponent', () => {
  let component: AdminliceosComponent;
  let fixture: ComponentFixture<AdminliceosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminliceosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminliceosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
