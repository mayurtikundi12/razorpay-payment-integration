import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpDonatingComponent } from './help-donating.component';

describe('HelpDonatingComponent', () => {
  let component: HelpDonatingComponent;
  let fixture: ComponentFixture<HelpDonatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelpDonatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelpDonatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
