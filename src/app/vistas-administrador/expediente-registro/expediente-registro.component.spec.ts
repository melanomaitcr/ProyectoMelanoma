import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteRegistroComponent } from './expediente-registro.component';

describe('ExpedienteRegistroComponent', () => {
  let component: ExpedienteRegistroComponent;
  let fixture: ComponentFixture<ExpedienteRegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpedienteRegistroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedienteRegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
