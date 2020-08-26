import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsappTowhysappComponent } from './whatsapp-towhysapp.component';

describe('WhatsappTowhysappComponent', () => {
  let component: WhatsappTowhysappComponent;
  let fixture: ComponentFixture<WhatsappTowhysappComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WhatsappTowhysappComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsappTowhysappComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
