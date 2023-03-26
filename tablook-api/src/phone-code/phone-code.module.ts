import { Module } from '@nestjs/common';
import { PhoneCodeController } from './phone-code.controller';
import { HttpModule } from '@nestjs/axios';
import { PhoneCodeService } from './/phone-code.service';

@Module({
  controllers: [PhoneCodeController],
  imports: [HttpModule],
  providers: [PhoneCodeService],
})
export class PhoneCodeModule {}
