import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LRHandlerComponent } from './lrhandler.component';

describe('LRHandlerComponent', () => {
  let component: LRHandlerComponent;
  let fixture: ComponentFixture<LRHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LRHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LRHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
