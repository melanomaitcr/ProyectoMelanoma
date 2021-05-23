import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteBitacoraComponent } from './expediente-bitacora.component';

describe('ExpedienteBitacoraComponent', () => {
  let component: ExpedienteBitacoraComponent;
  let fixture: ComponentFixture<ExpedienteBitacoraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpedienteBitacoraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedienteBitacoraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
