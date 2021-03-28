import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarAdministradorComponent } from './navbar-administrador.component';

describe('NavbarAdministradorComponent', () => {
  let component: NavbarAdministradorComponent;
  let fixture: ComponentFixture<NavbarAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarAdministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
