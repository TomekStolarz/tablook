import { Test, TestingModule } from '@nestjs/testing';
import { FastFilterController } from './fast-filter.controller';

describe('FastFiltersController', () => {
  let controller: FastFilterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FastFilterController],
    }).compile();

    controller = module.get<FastFilterController>(FastFilterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
