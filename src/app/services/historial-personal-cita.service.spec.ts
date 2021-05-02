import { TestBed } from '@angular/core/testing';

import { HistorialPersonalCitaService } from './historial-personal-cita.service';

describe('HistorialPersonalCitaService', () => {
  let service: HistorialPersonalCitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialPersonalCitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
