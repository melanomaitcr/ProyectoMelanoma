import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaMedicoComponent } from './cita-medico.component';

describe('CitaMedicoComponent', () => {
  let component: CitaMedicoComponent;
  let fixture: ComponentFixture<CitaMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitaMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
