import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { TbCountryPhoneCodeService } from 'src/app/services/tb-country-phone-code.service';
import { matchPasswordValidator } from 'src/register-module/directives/match-password-validator.directive';
import { passwordValidator } from 'src/register-module/directives/password-validator.directive';
import { phoneValidator } from 'src/register-module/directives/phone-validator.directive';
import { CountryPhoneCode } from 'src/register-module/interfaces/country-phone-code.interface';
import { CountryPhoneCodeService } from 'src/register-module/services/country-phone-code.service.interface';

@Component({
	selector: 'app-register-customer',
	templateUrl: './register-customer.component.html',
	styleUrls: ['./register-customer.component.scss'],
})
export class RegisterCustomerComponent implements OnInit {
	registerForm = this.fb.group(
		{
			email: ['', [Validators.required, Validators.email]],
			name: ['', Validators.required],
			surname: ['', Validators.required],
			phonePrefix: [
				'',
				Validators.required,
				Validators.pattern(/\d{1,3}/),
			],
			phone: ['', [Validators.required, phoneValidator()]],
			password: [
				'',
				[
					Validators.required,
					Validators.minLength(8),
					passwordValidator(),
				],
			],
			passwordRepeat: ['', [Validators.required]],
		},
		{ validators: matchPasswordValidator }
	);

	countryCodes: CountryPhoneCode[] = [];

	constructor(
		private fb: FormBuilder,
		private cps: TbCountryPhoneCodeService
	) {}

	ngOnInit(): void {
		this.cps
			.getCountryCode()
			.subscribe(
				(codes) =>
					(this.countryCodes = [...new Set(codes)].sort(
						(a, b) =>
							a.phoneCode.length - b.phoneCode.length ||
							a.phoneCode.localeCompare(b.phoneCode)
					))
			);
	}

	get password() {
		return this.registerForm.get('password');
	}

	get phone() {
		return this.registerForm.get('phone');
	}

	get phonePrefix() {
		return this.registerForm.get('phonePrefix');
	}

	get surname() {
		return this.registerForm.get('surname');
	}

	get name() {
		return this.registerForm.get('name');
	}

	get email() {
		return this.registerForm.get('email');
	}

	get passwordRepeat() {
		return this.registerForm.get('passwordRepeat');
	}
}
