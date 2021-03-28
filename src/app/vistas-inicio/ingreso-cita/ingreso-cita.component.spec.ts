import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { IngresoCitaComponent } from './ingreso-cita.component';

describe('IngresoCitaComponent', () => {
  let component: IngresoCitaComponent;
  let fixture: ComponentFixture<IngresoCitaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ IngresoCitaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
