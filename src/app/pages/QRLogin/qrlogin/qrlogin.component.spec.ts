import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QRLoginComponent } from './qrlogin.component';

describe('QRLoginComponent', () => {
  let component: QRLoginComponent;
  let fixture: ComponentFixture<QRLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QRLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QRLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
