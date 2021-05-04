import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedientesMedicoComponent } from './expedientes-medico.component';

describe('ExpedientesMedicoComponent', () => {
  let component: ExpedientesMedicoComponent;
  let fixture: ComponentFixture<ExpedientesMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpedientesMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedientesMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
