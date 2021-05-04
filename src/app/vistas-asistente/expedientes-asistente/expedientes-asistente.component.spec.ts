import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedientesAsistenteComponent } from './expedientes-asistente.component';

describe('ExpedientesAsistenteComponent', () => {
  let component: ExpedientesAsistenteComponent;
  let fixture: ComponentFixture<ExpedientesAsistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpedientesAsistenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedientesAsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
