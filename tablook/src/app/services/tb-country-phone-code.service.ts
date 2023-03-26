import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CountryPhoneCode } from 'src/register-module/interfaces/country-phone-code.interface';
import { CountryPhoneCodeService } from 'src/register-module/services/country-phone-code.service.interface';

interface resp {
	E164: string;
	phone_code: string;
	country_name: string;
}

@Injectable({
	providedIn: 'root',
})
export class TbCountryPhoneCodeService implements CountryPhoneCodeService {
	constructor(private http: HttpClient) {}

	corsHeaders = new HttpHeaders({
		'Content-Type': 'application/json',
		Accept: 'application/json',
		'Access-Control-Allow-Origin': '*',
	});

	getCountryCode(): Observable<CountryPhoneCode[]> {
		return this.http
			.get<resp[]>('https://countrycode.dev/api/calls', {
				headers: this.corsHeaders,
			})
			.pipe(
				map((phoneCodes) => {
					const codes = phoneCodes.map((data) => {
						return {
							countryKey: data.country_name,
							phoneCode: data.phone_code,
						};
					});
					return codes;
				})
			);
	}
}
