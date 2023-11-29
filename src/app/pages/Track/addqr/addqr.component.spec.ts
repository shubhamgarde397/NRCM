import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddqrComponent } from './addqr.component';

describe('AddqrComponent', () => {
  let component: AddqrComponent;
  let fixture: ComponentFixture<AddqrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddqrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddqrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
