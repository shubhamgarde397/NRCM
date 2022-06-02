import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TurnBookUpdateComponent } from './turn-book-update.component';

describe('TurnBookUpdateComponent', () => {
  let component: TurnBookUpdateComponent;
  let fixture: ComponentFixture<TurnBookUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TurnBookUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TurnBookUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
