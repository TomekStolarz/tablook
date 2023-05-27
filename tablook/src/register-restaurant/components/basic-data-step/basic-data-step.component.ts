import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { matchPasswordValidator } from 'src/register-module/directives/match-password-validator.directive';
import { passwordValidator } from 'src/register-module/directives/password-validator.directive';
import { phoneValidator } from 'src/register-module/directives/phone-validator.directive';
import { WatchRepeatPasswordErrorStrategy } from 'src/register-module/directives/watch-form-error-strategy';
import { CountryPhoneCode } from 'src/register-module/interfaces/country-phone-code.interface';
import { CountryPhoneCodeService } from 'src/register-module/services/country-phone-code.service.interface';
import { StepComponent } from 'src/register-restaurant/models/step-component.interface';
import { ErrorStateStrategy } from 'src/shared/directives/match-error-strategy';

@Component({
	selector: 'app-basic-data-step',
	templateUrl: './basic-data-step.component.html',
})
export class BasicDataStepComponent extends StepComponent implements OnInit {
	@Input()
	form!: FormGroup;

	watchMatcher = new WatchRepeatPasswordErrorStrategy();

	countryCodes: CountryPhoneCode[] = [];

	key = 'basicDataStepErrors';

	controls = [
		'email',
		'name',
		'phonePrefix',
		'phone',
		'password',
		'passwordRepeat',
	];

	constructor(private fb: FormBuilder, private cps: CountryPhoneCodeService) {
		super();
	}

	ngOnInit(): void {
		this.form.addControl(
			'email',
			this.fb.control('', [Validators.required, Validators.email])
		);
		this.form.addControl(
			'name',
			this.fb.control('', [Validators.required])
		);
		this.form.addControl(
			'phonePrefix',
			this.fb.control('', [Validators.required])
		);
		this.form.addControl(
			'phone',
			this.fb.control('', [Validators.required, phoneValidator()])
		);
		this.form.addControl(
			'password',
			this.fb.control('', [
				Validators.required,
				Validators.minLength(8),
				passwordValidator(),
			])
		);
		this.form.addControl(
			'passwordRepeat',
			this.fb.control('', [Validators.required])
		);
		this.form.addValidators(matchPasswordValidator);

		this.cps
			.getCountryCode()
			.subscribe((codes) => (this.countryCodes = [...codes]));
	}

	get password() {
		return this.form.get('password');
	}

	get phone() {
		return this.form.get('phone');
	}

	get phonePrefix() {
		return this.form.get('phonePrefix');
	}

	get name() {
		return this.form.get('name');
	}

	get email() {
		return this.form.get('email');
	}

	get passwordRepeat() {
		return this.form.get('passwordRepeat');
	}
}
