import { Test, TestingModule } from '@nestjs/testing';
import { FastFilterController } from './fast-filter.controller';
import { FastFilterService } from './fast-filter.service';

describe('FastFiltersController', () => {
  let controller: FastFilterController;
  let fastFilterService: FastFilterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FastFilterController],
      providers: [FastFilterService],
    }).compile();

    controller = module.get<FastFilterController>(FastFilterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
