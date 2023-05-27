import { Controller, Get, Redirect } from '@nestjs/common';
import { PhoneCodeService } from './phone-code.service';

@Controller('phonecode')
export class PhoneCodeController {
  constructor(private phoneCodeService: PhoneCodeService) {}

  @Get()
  getPhoneCodes() {
    return this.phoneCodeService.getPhoneCodes();
  }
}
