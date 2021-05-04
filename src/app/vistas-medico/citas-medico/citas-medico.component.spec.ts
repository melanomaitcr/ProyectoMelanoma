import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasMedicoComponent } from './citas-medico.component';

describe('CitasMedicoComponent', () => {
  let component: CitasMedicoComponent;
  let fixture: ComponentFixture<CitasMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitasMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
