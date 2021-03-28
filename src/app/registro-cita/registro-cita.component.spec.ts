import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RegistroCitaComponent } from './registro-cita.component';

describe('RegistroCitaComponent', () => {
  let component: RegistroCitaComponent;
  let fixture: ComponentFixture<RegistroCitaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroCitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
