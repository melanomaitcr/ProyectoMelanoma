import { TestBed } from '@angular/core/testing';

import { FamiliarOtroCancerService } from './familiar-otro-cancer.service';

describe('FamiliarOtroCancerService', () => {
  let service: FamiliarOtroCancerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FamiliarOtroCancerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
