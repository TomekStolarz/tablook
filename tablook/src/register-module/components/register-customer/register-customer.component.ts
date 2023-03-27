import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TbCountryPhoneCodeService } from 'src/app/services/tb-country-phone-code.service';
import { ErrorStateStrategy } from 'src/register-module/directives/match-error-strategy';
import { matchPasswordValidator } from 'src/register-module/directives/match-password-validator.directive';
import { passwordValidator } from 'src/register-module/directives/password-validator.directive';
import { phoneValidator } from 'src/register-module/directives/phone-validator.directive';
import { WatchRepeatPasswordErrorStrategy } from 'src/register-module/directives/watch-form-error-strategy';
import { CountryPhoneCode } from 'src/register-module/interfaces/country-phone-code.interface';
import { RegisterService } from 'src/register-module/services/register.service';

@Component({
	selector: 'app-register-customer',
	templateUrl: './register-customer.component.html',
	styleUrls: ['./register-customer.component.scss'],
})
export class RegisterCustomerComponent implements OnInit {
	registerForm = this.fb.nonNullable.group(
		{
			email: ['', [Validators.required, Validators.email]],
			name: ['', Validators.required],
			surname: ['', Validators.required],
			phonePrefix: ['', Validators.required],
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

	matcher = new ErrorStateStrategy();
	watchMatcher = new WatchRepeatPasswordErrorStrategy();

	countryCodes: CountryPhoneCode[] = [];

	constructor(
		private fb: FormBuilder,
		private cps: TbCountryPhoneCodeService,
		private registerService: RegisterService
	) {}

	ngOnInit(): void {
		this.cps
			.getCountryCode()
			.subscribe((codes) => (this.countryCodes = [...codes]));
	}

	singUp() {
		if (this.registerForm.invalid) {
			this.registerForm.markAllAsTouched();
			return;
		}
		const { phonePrefix, passwordRepeat, ...registerData } = {
			...this.registerForm.getRawValue(),
		};
		registerData.phone = `${phonePrefix}${registerData.phone}`;
		this.registerService
			.registerCustomer(registerData)
			.subscribe((response) => console.log(response));
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
