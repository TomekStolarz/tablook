import { TestBed } from '@angular/core/testing';

import { OrderActionService } from './order-action.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OrderActionService', () => {
  let service: OrderActionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(OrderActionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
