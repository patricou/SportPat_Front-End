import { TestBed, inject } from '@angular/core/testing';

import { EvenementsService } from './evenements.service';

describe('EvenementsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EvenementsService]
    });
  });

  it('should ...', inject([EvenementsService], (service: EvenementsService) => {
    expect(service).toBeTruthy();
  }));
});
