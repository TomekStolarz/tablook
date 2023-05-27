import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { StepComponent } from 'src/register-restaurant/models/step-component.interface';

@Component({
	selector: 'app-address-step',
	templateUrl: './address-step.component.html',
})
export class AddressStepComponent extends StepComponent implements OnInit {
	@Input()
	form!: FormGroup;

	controls = ['city', 'country', 'zip', 'street', 'flat'];

	key = 'addressError';

	constructor(private fb: FormBuilder) {
		super();
	}

	ngOnInit(): void {
		this.form.addControl('city', this.fb.control('', Validators.required));
		this.form.addControl(
			'country',
			this.fb.control('', Validators.required)
		);
		this.form.addControl(
			'street',
			this.fb.control('', Validators.required)
		);
		this.form.addControl(
			'zip',
			this.fb.control('', [Validators.required, Validators.maxLength(6)])
		);
		this.form.addControl('flat', this.fb.control('', Validators.required));
	}
}
