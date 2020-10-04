import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingOtherHandlerComponent } from './booking-other-handler.component';

describe('BookingOtherHandlerComponent', () => {
  let component: BookingOtherHandlerComponent;
  let fixture: ComponentFixture<BookingOtherHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingOtherHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingOtherHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
