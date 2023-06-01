import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ErrorStateStrategy } from 'src/shared/directives/match-error-strategy';
import { matchPasswordValidator } from 'src/register-module/directives/match-password-validator.directive';
import { passwordValidator } from 'src/register-module/directives/password-validator.directive';
import { phoneValidator } from 'src/register-module/directives/phone-validator.directive';
import { WatchRepeatPasswordErrorStrategy } from 'src/register-module/directives/watch-form-error-strategy';
import { CountryPhoneCode } from 'src/register-module/interfaces/country-phone-code.interface';
import { CountryPhoneCodeService } from 'src/register-module/services/country-phone-code.service.interface';
import { RegisterService } from 'src/register-module/services/register.service';
import { CustomSnackbarService } from 'src/shared/services/custom-snackbar.service';
import { UserType } from 'src/app/interfaces/user-type.enum';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
	selector: 'app-register-customer',
	templateUrl: './register-customer.component.html',
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

	error?: string;
	isMobile = false;

	countryCodes: CountryPhoneCode[] = [];

	constructor(
		private fb: FormBuilder,
		private cps: CountryPhoneCodeService,
		private registerService: RegisterService,
		private customSnackbarService: CustomSnackbarService,
		private responsive: BreakpointObserver
	) {}

	ngOnInit(): void {
		this.cps
			.getCountryCode()
			.subscribe((codes) => (this.countryCodes = [...codes]));
		
		this.responsive.observe([Breakpoints.TabletPortrait, Breakpoints.HandsetPortrait])
			.subscribe((result) => {
				if (result.matches) {
					this.isMobile = true;
				} else {
					this.isMobile = false;
				}
			});
	}

	singUp() {
		if (this.registerForm.invalid) {
			this.registerForm.markAllAsTouched();
			return;
		}
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		const { phonePrefix, passwordRepeat, ...registerData } = {
			...this.registerForm.getRawValue(),
		};
		registerData.phone = `+${phonePrefix}${registerData.phone}`;
		this.registerService
			.register(registerData, UserType.CUSTOMER)
			.subscribe((response) => {
				if (response.status === 201) {
					this.customSnackbarService.success(
						`User ${this.name?.value} ${this.surname?.value} successfully created.`,
						'Success'
					);
					this.registerForm.reset();
				} else {
					this.error = response.message;
				}
			});
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
