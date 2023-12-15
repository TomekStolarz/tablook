import { TestBed } from '@angular/core/testing';

import { FiltersService } from './filters.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('FiltersService', () => {
  let service: FiltersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(FiltersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
