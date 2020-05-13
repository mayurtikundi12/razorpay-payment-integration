import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyGiftCardComponent } from './buy-gift-card.component';

describe('BuyGiftCardComponent', () => {
  let component: BuyGiftCardComponent;
  let fixture: ComponentFixture<BuyGiftCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuyGiftCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyGiftCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
