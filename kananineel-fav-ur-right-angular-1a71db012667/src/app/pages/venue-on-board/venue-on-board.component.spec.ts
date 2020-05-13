import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenueOnBoardComponent } from './venue-on-board.component';

describe('VenueOnBoardComponent', () => {
  let component: VenueOnBoardComponent;
  let fixture: ComponentFixture<VenueOnBoardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenueOnBoardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenueOnBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
