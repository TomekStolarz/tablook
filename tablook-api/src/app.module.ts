import { Module } from '@nestjs/common';
import { PhoneCodeModule } from './phone-code/phone-code.module';

@Module({
  imports: [PhoneCodeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
