import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasAsistenteComponent } from './citas-asistente.component';

describe('CitasAsistenteComponent', () => {
  let component: CitasAsistenteComponent;
  let fixture: ComponentFixture<CitasAsistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitasAsistenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasAsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
