import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PhoneCodeModule } from './phone-code/phone-code.module';

@Module({
  imports: [
    PhoneCodeModule,
    MongooseModule.forRoot('mongodb://localhost/tablook'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
