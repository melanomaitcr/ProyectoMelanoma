import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarAsistenteComponent } from './navbar-asistente.component';

describe('NavbarAsistenteComponent', () => {
  let component: NavbarAsistenteComponent;
  let fixture: ComponentFixture<NavbarAsistenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarAsistenteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarAsistenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
