import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitaBorradoComponent } from './cita-borrado.component';

describe('CitaBorradoComponent', () => {
  let component: CitaBorradoComponent;
  let fixture: ComponentFixture<CitaBorradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitaBorradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitaBorradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
