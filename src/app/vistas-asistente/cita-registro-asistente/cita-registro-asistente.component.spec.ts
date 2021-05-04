import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaRegistroAsistenteComponent } from './cita-registro-asistente.component';

describe('CitaRegistroAsistenteComponent', () => {
  let component: CitaRegistroAsistenteComponent;
  let fixture: ComponentFixture<CitaRegistroAsistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitaRegistroAsistenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaRegistroAsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
