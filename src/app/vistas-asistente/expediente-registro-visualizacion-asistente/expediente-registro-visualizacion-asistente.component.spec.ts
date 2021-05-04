import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteRegistroVisualizacionAsistenteComponent } from './expediente-registro-visualizacion-asistente.component';

describe('ExpedienteRegistroVisualizacionAsistenteComponent', () => {
  let component: ExpedienteRegistroVisualizacionAsistenteComponent;
  let fixture: ComponentFixture<ExpedienteRegistroVisualizacionAsistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpedienteRegistroVisualizacionAsistenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedienteRegistroVisualizacionAsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
