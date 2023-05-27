import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, distinct, from, map, reduce, Observable } from 'rxjs';
import { CountryPhoneCode } from 'src/register-module/interfaces/country-phone-code.interface';
import { CountryPhoneCodeService } from 'src/register-module/services/country-phone-code.service.interface';
import { environment } from 'src/environments/environment';
@Injectable({
	providedIn: 'root',
})
export class TbCountryPhoneCodeService implements CountryPhoneCodeService {
	constructor(private http: HttpClient) {}
	private apiPath = environment.apiPath;

	getCountryCode(): Observable<CountryPhoneCode[]> {
		return this.http
			.get<CountryPhoneCode[]>(`${this.apiPath}/phonecode`)
			.pipe(
				concatMap((codes) => from(codes)),
				distinct(({ phoneCode }) => phoneCode),
				reduce((acc, curr) => {
					curr.phoneCode = curr.phoneCode.split(/[,\s]/)[0];
					if (curr.phoneCode !== '') {
						acc.push(curr);
					}
					return acc;
				}, new Array<CountryPhoneCode>()),
				map((codes) =>
					codes.sort(
						(a, b) =>
							a.phoneCode.length - b.phoneCode.length ||
							a.phoneCode.localeCompare(b.phoneCode)
					)
				)
			);
	}
}
