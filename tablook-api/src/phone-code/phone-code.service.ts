import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, map, Observable, tap } from 'rxjs';
import { CountryPhoneCode } from './models/country-phone-code.interface';
import { PhoneCodeResponse } from './models/phone-code-response.interface';

@Injectable()
export class PhoneCodeService {
  private readonly logger = new Logger(PhoneCodeService.name);

  constructor(private httpService: HttpService) {}

  getPhoneCodes(): Observable<CountryPhoneCode[]> {
    return this.httpService
      .get<PhoneCodeResponse[]>('https://countrycode.dev/api/calls')
      .pipe(
        map((codes) => {
          return codes.data.map((data) => {
            return {
              countryKey: data.country_name,
              phoneCode: data.phone_code,
            };
          });
        }),
        tap(() => this.logger.log('Phone codes data fetched successfully')),
        catchError((error: AxiosError) => {
          this.logger.error(error.response.data);
          throw 'Cannot get data from remote resource';
        }),
      );
  }
}
