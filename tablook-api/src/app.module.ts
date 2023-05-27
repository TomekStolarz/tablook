import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhoneCodeModule } from './phone-code/phone-code.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseHeadersInterceptor } from './interceptors/response-header.interceptor';
import { FileModule } from './file/file.module';
import { SearchModule } from './search/search.module';
import { FavouriteModule } from './favourite/favourite.module';
import { OrderModule } from './order/order.module';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/tablook'),
    PhoneCodeModule,
    UserModule,
    AuthModule,
    FileModule,
    SearchModule,
    FavouriteModule,
    OrderModule,
    RestaurantModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseHeadersInterceptor,
    },
  ],
})
export class AppModule {}
