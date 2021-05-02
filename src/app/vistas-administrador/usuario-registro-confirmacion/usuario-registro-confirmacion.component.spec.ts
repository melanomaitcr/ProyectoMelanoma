import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioRegistroConfirmacionComponent } from './usuario-registro-confirmacion.component';

describe('UsuarioRegistroConfirmacionComponent', () => {
  let component: UsuarioRegistroConfirmacionComponent;
  let fixture: ComponentFixture<UsuarioRegistroConfirmacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioRegistroConfirmacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioRegistroConfirmacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
