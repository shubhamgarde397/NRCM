import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDAddComponent } from './contact-dadd.component';

describe('ContactDAddComponent', () => {
  let component: ContactDAddComponent;
  let fixture: ComponentFixture<ContactDAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactDAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactDAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
