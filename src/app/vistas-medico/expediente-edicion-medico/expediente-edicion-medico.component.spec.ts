import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteEdicionMedicoComponent } from './expediente-edicion-medico.component';

describe('ExpedienteEdicionMedicoComponent', () => {
  let component: ExpedienteEdicionMedicoComponent;
  let fixture: ComponentFixture<ExpedienteEdicionMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpedienteEdicionMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedienteEdicionMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
