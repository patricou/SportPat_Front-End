import { TestBed, inject } from '@angular/core/testing';

import { MembersService } from './members.service';

describe('MembersService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MembersService]
    });
  });

  it('should ...', inject([MembersService], (service: MembersService) => {
    expect(service).toBeTruthy();
  }));
});
