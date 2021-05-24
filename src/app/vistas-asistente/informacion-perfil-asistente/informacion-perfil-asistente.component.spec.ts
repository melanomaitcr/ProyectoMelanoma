import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionPerfilAsistenteComponent } from './informacion-perfil-asistente.component';

describe('InformacionPerfilAsistenteComponent', () => {
  let component: InformacionPerfilAsistenteComponent;
  let fixture: ComponentFixture<InformacionPerfilAsistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InformacionPerfilAsistenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InformacionPerfilAsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
