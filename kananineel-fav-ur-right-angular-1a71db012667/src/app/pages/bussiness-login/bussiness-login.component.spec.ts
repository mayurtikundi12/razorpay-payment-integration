import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BussinessLoginComponent } from './bussiness-login.component';

describe('BussinessLoginComponent', () => {
  let component: BussinessLoginComponent;
  let fixture: ComponentFixture<BussinessLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BussinessLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BussinessLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
