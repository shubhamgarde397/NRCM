import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QrstatusComponent } from './qrstatus.component';

describe('QrstatusComponent', () => {
  let component: QrstatusComponent;
  let fixture: ComponentFixture<QrstatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QrstatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QrstatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
