import { RestaurantController } from './restaurant.controller';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { RestaurantService } from './restaurant.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [UserModule, HttpModule],
  controllers: [RestaurantController],
  providers: [RestaurantService],
})
export class RestaurantModule {}
