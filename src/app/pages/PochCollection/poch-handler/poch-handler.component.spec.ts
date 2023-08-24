import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PochHandlerComponent } from './poch-handler.component';

describe('PochHandlerComponent', () => {
  let component: PochHandlerComponent;
  let fixture: ComponentFixture<PochHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PochHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PochHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
