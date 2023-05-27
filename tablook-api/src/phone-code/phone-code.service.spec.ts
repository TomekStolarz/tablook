import { Test, TestingModule } from '@nestjs/testing';
import { PhoneCodeService } from './phone-code.service';

describe('PhoneCodeService', () => {
  let service: PhoneCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhoneCodeService],
    }).compile();

    service = module.get<PhoneCodeService>(PhoneCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
