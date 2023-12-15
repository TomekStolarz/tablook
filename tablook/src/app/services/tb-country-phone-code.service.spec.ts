import { TestBed } from '@angular/core/testing';

import { TbCountryPhoneCodeService } from './tb-country-phone-code.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TbCountryPhoneCodeService', () => {
	let service: TbCountryPhoneCodeService;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports:[HttpClientTestingModule]
		});
		service = TestBed.inject(TbCountryPhoneCodeService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
