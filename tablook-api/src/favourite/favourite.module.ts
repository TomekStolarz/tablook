import { Module } from '@nestjs/common';
import { FavouriteController } from './favourite.controller';
import { FavouriteService } from './favourite.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [FavouriteController],
  providers: [FavouriteService, AuthService, JwtService],
  exports: [FavouriteService],
})
export class FavouriteModule {}
