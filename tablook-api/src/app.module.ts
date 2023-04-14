import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhoneCodeModule } from './phone-code/phone-code.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseHeadersInterceptor } from './interceptors/response-header.interceptor';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/tablook'),
    PhoneCodeModule,
    UserModule,
    AuthModule,
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
