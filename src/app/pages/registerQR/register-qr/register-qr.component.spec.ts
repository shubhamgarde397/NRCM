import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterQRComponent } from './register-qr.component';

describe('RegisterQRComponent', () => {
  let component: RegisterQRComponent;
  let fixture: ComponentFixture<RegisterQRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterQRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterQRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
