import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteRegistroConfirmacionAsistenteComponent } from './expediente-registro-confirmacion-asistente.component';

describe('ExpedienteRegistroConfirmacionAsistenteComponent', () => {
  let component: ExpedienteRegistroConfirmacionAsistenteComponent;
  let fixture: ComponentFixture<ExpedienteRegistroConfirmacionAsistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpedienteRegistroConfirmacionAsistenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedienteRegistroConfirmacionAsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
