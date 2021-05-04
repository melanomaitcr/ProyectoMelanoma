import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaVisualizacionAsistenteComponent } from './cita-visualizacion-asistente.component';

describe('CitaVisualizacionAsistenteComponent', () => {
  let component: CitaVisualizacionAsistenteComponent;
  let fixture: ComponentFixture<CitaVisualizacionAsistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitaVisualizacionAsistenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaVisualizacionAsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
