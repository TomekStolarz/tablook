import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule, Type } from '@angular/core';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterCustomerComponent } from './components/register-customer/register-customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { CountryPhoneCodeService } from './services/country-phone-code.service.interface';
import { PhonePrefixPipe } from './pipes/phone-prefix.pipe';
import { SharedModule } from 'src/shared/shared.module';
import { TbCountryPhoneCodeService } from 'src/app/services/tb-country-phone-code.service';

@NgModule({
	declarations: [RegisterCustomerComponent, PhonePrefixPipe],
	imports: [
		RegisterRoutingModule,
		CommonModule,
		MatInputModule,
		MatButtonModule,
		ReactiveFormsModule,
		MatSelectModule,
		MatCardModule,
		SharedModule,
	],
	providers: [
		{
			provide: CountryPhoneCodeService,
			useClass: TbCountryPhoneCodeService,
		},
	],
	exports: [RegisterCustomerComponent],
})
export class RegisterModule {
	static forRoot(
		countryPhoneCodeService: Type<CountryPhoneCodeService>
	): ModuleWithProviders<RegisterModule> {
		return {
			ngModule: RegisterModule,
			providers: [
				{
					provide: CountryPhoneCodeService,
					useExisting: countryPhoneCodeService,
				},
			],
		};
	}
}
