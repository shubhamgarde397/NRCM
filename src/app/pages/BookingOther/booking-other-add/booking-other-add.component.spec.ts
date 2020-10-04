import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingOtherAddComponent } from './booking-other-add.component';

describe('BookingOtherAddComponent', () => {
  let component: BookingOtherAddComponent;
  let fixture: ComponentFixture<BookingOtherAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookingOtherAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookingOtherAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
