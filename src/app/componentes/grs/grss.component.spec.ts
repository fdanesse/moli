import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrssComponent } from './grss.component';

describe('GrssComponent', () => {
  let component: GrssComponent;
  let fixture: ComponentFixture<GrssComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrssComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrssComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
