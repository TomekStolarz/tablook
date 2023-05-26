import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepComponent } from 'src/register-restaurant/models/step-component.interface';
import { ErrorStateStrategy } from 'src/shared/directives/match-error-strategy';

@Component({
	selector: 'app-photos-step',
	templateUrl: './photos-step.component.html',
})
export class PhotosStepComponent extends StepComponent implements OnInit {
	@Input()
	form!: FormGroup;

	key = 'photosStepError';

	controls = ['images', 'tablesMap'];

	images: { [key: string]: File[] } = {
		[this.controls[0]]: [],
		[this.controls[1]]: [],
	};

	constructor(private fb: FormBuilder) {
		super();
	}

	ngOnInit(): void {
		this.form.addControl(
			'images',
			this.fb.control('', Validators.required)
		);
		this.form.addControl(
			'tablesMap',
			this.fb.control([''], Validators.required)
		);
	}

	register(): void {
		this.validatePart();
		if (this.form.invalid) {
			return;
		}
	}

	onFileSelected(event: any, key: string) {
		this.images[key] = [...event.target.files];
	}
}
