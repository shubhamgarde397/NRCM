import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TPTWelcomeComponent } from './tptwelcome.component';

describe('TPTWelcomeComponent', () => {
  let component: TPTWelcomeComponent;
  let fixture: ComponentFixture<TPTWelcomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TPTWelcomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TPTWelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
