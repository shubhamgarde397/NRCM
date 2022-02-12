import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalanceHireHandlerComponent } from './balance-hire-handler.component';

describe('BalanceHireHandlerComponent', () => {
  let component: BalanceHireHandlerComponent;
  let fixture: ComponentFixture<BalanceHireHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalanceHireHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalanceHireHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
