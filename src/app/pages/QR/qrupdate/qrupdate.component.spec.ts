import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QRUpdateComponent } from './qrupdate.component';

describe('QRUpdateComponent', () => {
  let component: QRUpdateComponent;
  let fixture: ComponentFixture<QRUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QRUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QRUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
