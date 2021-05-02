import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteEdicionComponent } from './expediente-edicion.component';

describe('ExpedienteEdicionComponent', () => {
  let component: ExpedienteEdicionComponent;
  let fixture: ComponentFixture<ExpedienteEdicionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpedienteEdicionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedienteEdicionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
