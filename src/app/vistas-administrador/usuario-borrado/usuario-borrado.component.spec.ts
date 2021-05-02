import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioBorradoComponent } from './usuario-borrado.component';

describe('UsuarioBorradoComponent', () => {
  let component: UsuarioBorradoComponent;
  let fixture: ComponentFixture<UsuarioBorradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioBorradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioBorradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
