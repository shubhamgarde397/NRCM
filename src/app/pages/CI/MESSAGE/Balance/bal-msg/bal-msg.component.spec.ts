import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BalMsgComponent } from './bal-msg.component';

describe('BalMsgComponent', () => {
  let component: BalMsgComponent;
  let fixture: ComponentFixture<BalMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BalMsgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BalMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
