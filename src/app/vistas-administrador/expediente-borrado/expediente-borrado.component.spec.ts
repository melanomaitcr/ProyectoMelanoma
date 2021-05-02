import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedienteBorradoComponent } from './expediente-borrado.component';

describe('ExpedienteBorradoComponent', () => {
  let component: ExpedienteBorradoComponent;
  let fixture: ComponentFixture<ExpedienteBorradoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpedienteBorradoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedienteBorradoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
