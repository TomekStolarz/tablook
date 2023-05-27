import {
	Component,
	EventEmitter,
	Input,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { StepComponent } from 'src/register-restaurant/models/step-component.interface';

@Component({
	selector: 'app-photos-step',
	templateUrl: './photos-step.component.html',
})
export class PhotosStepComponent
	extends StepComponent
	implements OnInit, OnDestroy
{
	@Input()
	form!: FormGroup;

	@Input()
	formResetEvent!: Subject<void>;

	@Output()
	validateForm: EventEmitter<void> = new EventEmitter<void>();

	@Output()
	registerRestaurant: EventEmitter<{ [key: string]: File[] }> =
		new EventEmitter<{ [key: string]: File[] }>();

	key = 'photosStepError';

	controls = ['images', 'tableMap'];

	defaultImagesState = {
		[this.controls[0]]: [],
		[this.controls[1]]: [],
	};

	images: { [key: string]: File[] } = { ...this.defaultImagesState };

	subscription?: Subscription;

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
			this.fb.control('', Validators.required)
		);

		this.subscription = this.formResetEvent.subscribe(
			() => (this.images = { ...this.defaultImagesState })
		);
	}

	ngOnDestroy(): void {
		this.subscription?.unsubscribe();
	}

	register(): void {
		this.validatePart();
		if (this.form.invalid) {
			return;
		}

		this.registerRestaurant.emit(this.images);
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	onFileSelected(event: any, key: string) {
		if (event.target.files.length) {
			this.images[key] = [...event.target.files];
		}

		this.validateForm.emit();
	}

	removeFile(name: string, key: string) {
		const index = this.images[key].findIndex((file) => file.name === name);
		this.images[key].splice(index, 1);
		if (!this.images[key].length) {
			this.form.get(key)?.reset();
		}
	}

	get tableMap() {
		return this.form.get('tableMap');
	}

	get imagesInput() {
		return this.form.get('images');
	}
}
