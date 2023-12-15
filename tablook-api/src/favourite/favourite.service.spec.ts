import { Test, TestingModule } from '@nestjs/testing';
import { FavouriteService } from './favourite.service';
import { UserModule } from 'src/user/user.module';

describe('FavouriteService', () => {
  let service: FavouriteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FavouriteService],
      imports: [UserModule],
    }).compile();

    service = module.get<FavouriteService>(FavouriteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
