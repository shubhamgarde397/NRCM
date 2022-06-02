import { TestBed, inject } from '@angular/core/testing';

import { PassDataService } from './pass-data.service';

describe('PassDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PassDataService]
    });
  });

  it('should be created', inject([PassDataService], (service: PassDataService) => {
    expect(service).toBeTruthy();
  }));
});
