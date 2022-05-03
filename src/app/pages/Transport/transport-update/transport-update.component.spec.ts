import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportUpdateComponent } from './transport-update.component';

describe('TransportUpdateComponent', () => {
  let component: TransportUpdateComponent;
  let fixture: ComponentFixture<TransportUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransportUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
