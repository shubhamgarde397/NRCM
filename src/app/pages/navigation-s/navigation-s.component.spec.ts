import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationSComponent } from './navigation-s.component';

describe('NavigationSComponent', () => {
  let component: NavigationSComponent;
  let fixture: ComponentFixture<NavigationSComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavigationSComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
