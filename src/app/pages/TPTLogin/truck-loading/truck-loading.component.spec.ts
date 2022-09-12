import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckLoadingComponent } from './truck-loading.component';

describe('TruckLoadingComponent', () => {
  let component: TruckLoadingComponent;
  let fixture: ComponentFixture<TruckLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TruckLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TruckLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
