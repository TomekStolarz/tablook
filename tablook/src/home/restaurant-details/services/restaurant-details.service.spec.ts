import { TestBed } from '@angular/core/testing';

import { RestaurantDetailsService } from './restaurant-details.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SearchService } from 'src/home/search-module/services/search.service';

describe('RestaurantDetailsService', () => {
  let service: RestaurantDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{provide: SearchService, useValue: ''}]
    });
    service = TestBed.inject(RestaurantDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
