import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionPerfilMedicoComponent } from './informacion-perfil-medico.component';

describe('InformacionPerfilMedicoComponent', () => {
  let component: InformacionPerfilMedicoComponent;
  let fixture: ComponentFixture<InformacionPerfilMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionPerfilMedicoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionPerfilMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
