import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportDisplayComponent } from './transport-display.component';

describe('TransportDisplayComponent', () => {
  let component: TransportDisplayComponent;
  let fixture: ComponentFixture<TransportDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
