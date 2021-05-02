import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaEdicionComponent } from './cita-edicion.component';

describe('CitaEdicionComponent', () => {
  let component: CitaEdicionComponent;
  let fixture: ComponentFixture<CitaEdicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitaEdicionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
