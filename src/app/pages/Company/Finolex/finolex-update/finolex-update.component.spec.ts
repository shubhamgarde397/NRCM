import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinolexUpdateComponent } from './finolex-update.component';

describe('FinolexUpdateComponent', () => {
  let component: FinolexUpdateComponent;
  let fixture: ComponentFixture<FinolexUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinolexUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinolexUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
