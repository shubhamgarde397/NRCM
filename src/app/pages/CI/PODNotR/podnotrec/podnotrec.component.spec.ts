import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PODNOTRECComponent } from './podnotrec.component';

describe('PODNOTRECComponent', () => {
  let component: PODNOTRECComponent;
  let fixture: ComponentFixture<PODNOTRECComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PODNOTRECComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PODNOTRECComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
