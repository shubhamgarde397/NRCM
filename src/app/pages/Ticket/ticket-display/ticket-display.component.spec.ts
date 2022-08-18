import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDisplayComponent } from './ticket-display.component';

describe('TicketDisplayComponent', () => {
  let component: TicketDisplayComponent;
  let fixture: ComponentFixture<TicketDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
