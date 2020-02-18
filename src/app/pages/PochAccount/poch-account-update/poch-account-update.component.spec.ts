import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PochAccountUpdateComponent } from './poch-account-update.component';

describe('PochAccountUpdateComponent', () => {
  let component: PochAccountUpdateComponent;
  let fixture: ComponentFixture<PochAccountUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PochAccountUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PochAccountUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
