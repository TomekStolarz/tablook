import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AddressStepComponent } from '../address-step/address-step.component';
import { BasicDataStepComponent } from '../basic-data-step/basic-data-step.component';
import { DetailsStepComponent } from '../details-step/details-step.component';
import { PhotosStepComponent } from '../photos-step/photos-step.component';
import { OpeningHours } from 'src/register-restaurant/models/opening-hours.interface';

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

	constructor(private fb: FormBuilder) {}

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
}
