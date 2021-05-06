import { TestBed } from '@angular/core/testing';

import { AsistenteGuard } from './asistente.guard';

describe('AsistenteAdministradorGuard', () => {
  let guard: AsistenteGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AsistenteGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
