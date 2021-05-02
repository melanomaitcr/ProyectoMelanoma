import { TestBed } from '@angular/core/testing';

import { ArchivoCitaService } from './archivo-cita.service';

describe('ArchivoCitaService', () => {
  let service: ArchivoCitaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ArchivoCitaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
