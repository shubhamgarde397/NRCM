import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PODSTATComponent } from './podstat.component';

describe('PODSTATComponent', () => {
  let component: PODSTATComponent;
  let fixture: ComponentFixture<PODSTATComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PODSTATComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PODSTATComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
