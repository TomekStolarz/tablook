import { TestBed } from '@angular/core/testing';

import { OrderActionService } from './order-action.service';

describe('OrderActionService', () => {
  let service: OrderActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
