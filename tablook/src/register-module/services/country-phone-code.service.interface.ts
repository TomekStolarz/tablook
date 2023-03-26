import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CountryPhoneCode } from '../interfaces/country-phone-code.interface';

@Injectable({
	providedIn: 'any',
})
export abstract class CountryPhoneCodeService {
	abstract getCountryCode(): Observable<CountryPhoneCode[]>;
}
