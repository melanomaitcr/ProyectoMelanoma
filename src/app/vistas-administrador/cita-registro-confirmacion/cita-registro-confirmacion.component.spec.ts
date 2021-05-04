import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaRegistroConfirmacionComponent } from './cita-registro-confirmacion.component';

describe('CitaRegistroConfirmacionComponent', () => {
  let component: CitaRegistroConfirmacionComponent;
  let fixture: ComponentFixture<CitaRegistroConfirmacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitaRegistroConfirmacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaRegistroConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
