import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepComponent } from 'src/register-restaurant/models/step-component.interface';

@Component({
	selector: 'app-photos-step',
	templateUrl: './photos-step.component.html',
})
export class PhotosStepComponent extends StepComponent implements OnInit {
	@Input()
	form!: FormGroup;

	@Output()
	validateForm: EventEmitter<void> = new EventEmitter<void>();

	@Output()
	registerRestaurant: EventEmitter<{ [key: string]: File[] }> =
		new EventEmitter<{ [key: string]: File[] }>();

	key = 'photosStepError';

	controls = ['images', 'tableMap'];

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
			'tableMap',
			this.fb.control([''], Validators.required)
		);
	}

	register(): void {
		this.validatePart();
		if (this.form.invalid) {
			return;
		}

		this.registerRestaurant.emit(this.images);
	}

	onFileSelected(event: any, key: string) {
		this.images[key] = [...event.target.files];
		this.validateForm.emit();
	}
}
