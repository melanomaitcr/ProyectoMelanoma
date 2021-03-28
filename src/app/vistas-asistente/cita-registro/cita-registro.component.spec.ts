import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CitaRegistroComponent } from './cita-registro.component';

describe('RegistroCitaComponent', () => {
  let component: CitaRegistroComponent;
  let fixture: ComponentFixture<CitaRegistroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CitaRegistroComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
