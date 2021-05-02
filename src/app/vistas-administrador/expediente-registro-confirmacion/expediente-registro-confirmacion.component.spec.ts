import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteRegistroConfirmacionComponent } from './expediente-registro-confirmacion.component';

describe('ExpedienteRegistroConfirmacionComponent', () => {
  let component: ExpedienteRegistroConfirmacionComponent;
  let fixture: ComponentFixture<ExpedienteRegistroConfirmacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpedienteRegistroConfirmacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedienteRegistroConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
