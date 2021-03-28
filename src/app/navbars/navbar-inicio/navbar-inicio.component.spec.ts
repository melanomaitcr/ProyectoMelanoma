import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarInicioComponent } from './navbar-inicio.component';

describe('NavbarInicioComponent', () => {
  let component: NavbarInicioComponent;
  let fixture: ComponentFixture<NavbarInicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarInicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
