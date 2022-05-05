import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportHandlerComponent } from './transport-handler.component';

describe('TransportHandlerComponent', () => {
  let component: TransportHandlerComponent;
  let fixture: ComponentFixture<TransportHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
