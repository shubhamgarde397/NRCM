import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketHandlerComponent } from './ticket-handler.component';

describe('TicketHandlerComponent', () => {
  let component: TicketHandlerComponent;
  let fixture: ComponentFixture<TicketHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
