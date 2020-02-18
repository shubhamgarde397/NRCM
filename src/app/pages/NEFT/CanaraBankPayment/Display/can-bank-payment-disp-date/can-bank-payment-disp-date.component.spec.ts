import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanBankPaymentDispDateComponent } from './can-bank-payment-disp-date.component';

describe('CanBankPaymentDispDateComponent', () => {
  let component: CanBankPaymentDispDateComponent;
  let fixture: ComponentFixture<CanBankPaymentDispDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanBankPaymentDispDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanBankPaymentDispDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
