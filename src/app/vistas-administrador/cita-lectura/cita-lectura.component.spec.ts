import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaLecturaComponent } from './cita-lectura.component';

describe('CitaLecturaComponent', () => {
  let component: CitaLecturaComponent;
  let fixture: ComponentFixture<CitaLecturaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitaLecturaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaLecturaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
