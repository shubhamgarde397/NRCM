import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TPTLoginPageComponent } from './tptlogin-page.component';

describe('TPTLoginPageComponent', () => {
  let component: TPTLoginPageComponent;
  let fixture: ComponentFixture<TPTLoginPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TPTLoginPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TPTLoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
