import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaInicioMedicoComponent } from './cita-inicio-medico.component';

describe('CitaInicioMedicoComponent', () => {
  let component: CitaInicioMedicoComponent;
  let fixture: ComponentFixture<CitaInicioMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitaInicioMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaInicioMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
