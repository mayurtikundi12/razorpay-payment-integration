import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneVerifierComponent } from './phone-verifier.component';

describe('PhoneVerifierComponent', () => {
  let component: PhoneVerifierComponent;
  let fixture: ComponentFixture<PhoneVerifierComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhoneVerifierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneVerifierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
