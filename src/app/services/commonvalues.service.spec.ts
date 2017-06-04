import { TestBed, inject } from '@angular/core/testing';

import { CommonvaluesService } from './commonvalues.service';

describe('CommonvaluesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CommonvaluesService]
    });
  });

  it('should ...', inject([CommonvaluesService], (service: CommonvaluesService) => {
    expect(service).toBeTruthy();
  }));
});
