import { NgModule } from '@angular/core';
import { RegisterRestaurantComponent } from './components/register-restaurant/register-restaurant.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RegisterRestaurantRoutingModule } from './register-restaurant-routing.module';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CountryPhoneCodeService } from 'src/register-module/services/country-phone-code.service.interface';
import { TbCountryPhoneCodeService } from 'src/app/services/tb-country-phone-code.service';
import { BasicDataStepComponent } from './components/basic-data-step/basic-data-step.component';
import { AddressStepComponent } from './components/address-step/address-step.component';
import { DetailsStepComponent } from './components/details-step/details-step.component';
import { PhotosStepComponent } from './components/photos-step/photos-step.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@NgModule({
	declarations: [
		RegisterRestaurantComponent,
		BasicDataStepComponent,
		AddressStepComponent,
		DetailsStepComponent,
		PhotosStepComponent,
	],
	imports: [
		RegisterRestaurantRoutingModule,
		CommonModule,
		MatInputModule,
		MatButtonModule,
		MatSelectModule,
		ReactiveFormsModule,
		SharedModule,
		MatOptionModule,
		MatStepperModule,
		MatIconModule,
	],
	providers: [
		{
			provide: CountryPhoneCodeService,
			useClass: TbCountryPhoneCodeService,
		},
		{
			provide: STEPPER_GLOBAL_OPTIONS,
			useValue: { showError: true },
		},
	],
})
export class RegisterRestaurantModule {}
