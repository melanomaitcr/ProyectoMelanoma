import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaRegistroConfirmacionAsistenteComponent } from './cita-registro-confirmacion-asistente.component';

describe('CitaRegistroConfirmacionAsistenteComponent', () => {
  let component: CitaRegistroConfirmacionAsistenteComponent;
  let fixture: ComponentFixture<CitaRegistroConfirmacionAsistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitaRegistroConfirmacionAsistenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaRegistroConfirmacionAsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
