import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StepComponent } from 'src/register-restaurant/models/step-component.interface';

@Component({
	selector: 'app-photos-step',
	templateUrl: './photos-step.component.html',
})
export class PhotosStepComponent extends StepComponent {
	@Input()
	form!: FormGroup;

	key = 'photosStepError';

	controls = ['images', 'tablesMap'];

	constructor(private fb: FormBuilder) {
		super();
	}
}
