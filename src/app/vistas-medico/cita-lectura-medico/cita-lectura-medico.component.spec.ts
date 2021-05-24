import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaLecturaMedicoComponent } from './cita-lectura-medico.component';

describe('CitaLecturaMedicoComponent', () => {
  let component: CitaLecturaMedicoComponent;
  let fixture: ComponentFixture<CitaLecturaMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitaLecturaMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaLecturaMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
