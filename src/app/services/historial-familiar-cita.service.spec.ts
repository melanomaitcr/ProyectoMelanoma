import { TestBed } from '@angular/core/testing';

import { HistorialFamiliarCitaService } from './historial-familiar-cita.service';

describe('HistorialFamiliarCitaService', () => {
  let service: HistorialFamiliarCitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistorialFamiliarCitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
