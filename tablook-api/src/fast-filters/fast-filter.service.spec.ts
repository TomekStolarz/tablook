import { Test, TestingModule } from '@nestjs/testing';
import { FastFilterService } from './fast-filter.service';

describe('FastFilterService', () => {
  let service: FastFilterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FastFilterService],
    }).compile();

    service = module.get<FastFilterService>(FastFilterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
