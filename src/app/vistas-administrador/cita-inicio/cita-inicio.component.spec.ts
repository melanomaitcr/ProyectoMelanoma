import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaInicioComponent } from './cita-inicio.component';

describe('CitaInicioComponent', () => {
  let component: CitaInicioComponent;
  let fixture: ComponentFixture<CitaInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitaInicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
