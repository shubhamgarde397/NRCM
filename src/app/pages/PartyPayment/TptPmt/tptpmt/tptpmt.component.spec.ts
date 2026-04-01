import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TptpmtComponent } from './tptpmt.component';

describe('TptpmtComponent', () => {
  let component: TptpmtComponent;
  let fixture: ComponentFixture<TptpmtComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TptpmtComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TptpmtComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
