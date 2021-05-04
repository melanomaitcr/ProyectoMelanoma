import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteRegistroAsistenteComponent } from './expediente-registro-asistente.component';

describe('ExpedienteRegistroAsistenteComponent', () => {
  let component: ExpedienteRegistroAsistenteComponent;
  let fixture: ComponentFixture<ExpedienteRegistroAsistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpedienteRegistroAsistenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedienteRegistroAsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
