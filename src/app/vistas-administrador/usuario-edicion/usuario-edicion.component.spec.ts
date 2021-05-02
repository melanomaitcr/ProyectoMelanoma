import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UsuarioEdicionComponent } from './usuario-edicion.component';

describe('UsuarioComponent', () => {
  let component: UsuarioEdicionComponent;
  let fixture: ComponentFixture<UsuarioEdicionComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioEdicionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
