import { Test, TestingModule } from '@nestjs/testing';
import { PhoneCodeService } from './phone-code.service';
import { HttpService } from '@nestjs/axios';

describe('PhoneCodeService', () => {
  let service: PhoneCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhoneCodeService, HttpService],
    }).compile();

    service = module.get<PhoneCodeService>(PhoneCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
