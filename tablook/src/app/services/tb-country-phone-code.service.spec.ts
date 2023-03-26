import { TestBed } from '@angular/core/testing';

import { TbCountryPhoneCodeService } from './tb-country-phone-code.service';

describe('TbCountryPhoneCodeService', () => {
	let service: TbCountryPhoneCodeService;

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(TbCountryPhoneCodeService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
