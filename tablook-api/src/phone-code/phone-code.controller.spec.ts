import { Test, TestingModule } from '@nestjs/testing';
import { PhoneCodeController } from './phone-code.controller';
import { PhoneCodeService } from './phone-code.service';

describe('PhoneCodeController', () => {
  let controller: PhoneCodeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhoneCodeController],
      providers: [PhoneCodeService],
    }).compile();

    controller = module.get<PhoneCodeController>(PhoneCodeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
