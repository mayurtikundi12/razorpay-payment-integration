import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// import { LoginComponent } from './login.component';
import { MainNewComponent } from './main-new.component';

describe('LoginComponent', () => {
  let component: MainNewComponent;
  let fixture: ComponentFixture<MainNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
