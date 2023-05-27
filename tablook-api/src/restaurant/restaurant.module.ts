import { RestaurantController } from './restaurant.controller';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [RestaurantController],
  providers: [],
})
export class RestaurantModule {}
