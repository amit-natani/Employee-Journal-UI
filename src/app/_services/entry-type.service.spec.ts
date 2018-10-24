import { TestBed, inject } from '@angular/core/testing';

import { EntryTypeService } from './entry-type.service';

describe('EntryTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntryTypeService]
    });
  });

  it('should be created', inject([EntryTypeService], (service: EntryTypeService) => {
    expect(service).toBeTruthy();
  }));
});
