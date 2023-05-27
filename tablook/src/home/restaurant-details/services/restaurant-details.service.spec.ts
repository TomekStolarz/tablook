import { TestBed } from '@angular/core/testing';

import { RestaurantDetailsService } from './restaurant-details.service';

describe('RestaurantDetailsService', () => {
  let service: RestaurantDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestaurantDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
