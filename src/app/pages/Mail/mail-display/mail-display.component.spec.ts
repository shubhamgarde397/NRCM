import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailDisplayComponent } from './mail-display.component';

describe('MailDisplayComponent', () => {
  let component: MailDisplayComponent;
  let fixture: ComponentFixture<MailDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
