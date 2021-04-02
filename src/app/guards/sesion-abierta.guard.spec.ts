import { TestBed } from '@angular/core/testing';

import { SesionAbiertaGuard } from './sesion-abierta.guard';

describe('SesionAbiertaGuard', () => {
  let guard: SesionAbiertaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SesionAbiertaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
