import { Test, TestingModule } from '@nestjs/testing';
import { PhoneCodeController } from './phone-code.controller';

describe('PhoneCodeController', () => {
  let controller: PhoneCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhoneCodeController],
      providers: [],
    }).compile();

    controller = module.get<PhoneCodeController>(PhoneCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
