import { TestBed } from '@angular/core/testing';

import { AsistenteAdministradorGuard } from './asistente-administrador.guard';

describe('AsistenteAdministradorGuard', () => {
  let guard: AsistenteAdministradorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AsistenteAdministradorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
