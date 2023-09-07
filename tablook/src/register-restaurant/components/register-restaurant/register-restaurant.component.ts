import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddressStepComponent } from '../address-step/address-step.component';
import { BasicDataStepComponent } from '../basic-data-step/basic-data-step.component';
import { DetailsStepComponent } from '../details-step/details-step.component';
import { PhotosStepComponent } from '../photos-step/photos-step.component';
import { OpeningHours } from 'src/register-restaurant/models/opening-hours.interface';
import { RegisterService } from 'src/register-module/services/register.service';
import { CustomSnackbarService } from 'src/shared/services/custom-snackbar.service';
import { RegisterData } from 'src/register-module/interfaces/register-data.interface';
import { UserType } from 'src/app/interfaces/user-type.enum';
import { Subject } from 'rxjs';

@Component({
	selector: 'app-register-restaurant',
	templateUrl: './register-restaurant.component.html',
})
export class RegisterRestaurantComponent implements AfterViewInit {
	formGroup: FormGroup = this.fb.group({});

	@ViewChild(AddressStepComponent)
	addressStep!: AddressStepComponent;

	@ViewChild(BasicDataStepComponent)
	basicStep!: BasicDataStepComponent;

	@ViewChild(DetailsStepComponent)
	detailsStep!: DetailsStepComponent;

	@ViewChild(PhotosStepComponent)
	photosStep!: PhotosStepComponent;

	componentsArray: (
		| AddressStepComponent
		| BasicDataStepComponent
		| DetailsStepComponent
		| PhotosStepComponent
	)[] = [];

	error?: string;

	openingHours: OpeningHours[] = [];

	formResetEvent: Subject<void> = new Subject();

	constructor(
		private fb: FormBuilder,
		private registerService: RegisterService,
		private customSnackbarService: CustomSnackbarService
	) {}

	ngAfterViewInit(): void {
		this.componentsArray = [
			this.basicStep,
			this.addressStep,
			this.detailsStep,
			this.photosStep,
		];
	}

	validatePart(event: StepperSelectionEvent) {
		const slicingIndex = Math.max(
			event.selectedIndex,
			event.previouslySelectedIndex
		);
		this.componentsArray
			.slice(0, slicingIndex)
			.forEach((comp) => comp.validatePart());
	}

	validateForm() {
		this.componentsArray.slice(0, 3).forEach((comp) => comp.validatePart());
	}

	register(images: { [key: string]: File[] }) {
		const formData = this.formGroup.getRawValue();

		const registerData: RegisterData = {
			name: formData.name,
			email: formData.email,
			password: formData.password,
			phone: `+${formData.phonePrefix} ${formData.phone}`,
			type: UserType.RESTAURANT,
			details: {
				address: {
					city: formData.city,
					country: formData.country,
					zip: formData.zip,
					street: formData.street,
					flat: formData.flat,
				},
				openingHours: this.openingHours,
				images: [],
				description: formData.description,
				googleMapsLink: formData.googleMapsLink,
				tags: formData.tags
					.split(/[,;]/)
					.map((x: string) => x.trim())
					.filter((x: string) => !!x),
				tables: JSON.parse(formData.tables),
				tablesMap: '',
			},
		};

		this.registerService
			.registerRestaurant(
				registerData,
				images['images'],
				images['tableMap'][0]
			)
			.subscribe((response) => {
				if (response.status === 201) {
					this.customSnackbarService.success(
						`Restaurant ${registerData.name} successfully created.`,
						'Success'
					);
					this.formGroup.reset();
					this.openingHours = [];
					this.formResetEvent.next();
				} else {
					this.error = response.message;
				}
			});
	}
}
