import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhoneCodeModule } from './phone-code/phone-code.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/tablook'),
    PhoneCodeModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
