import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterCustomerComponent } from './components/register-customer/register-customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { CountryPhoneCodeService } from './services/country-phone-code.service.interface';
import { PhonePrefixPipe } from './pipes/phone-prefix.pipe';
import { ErrorStateStrategy } from './directives/match-error-strategy';
import { ErrorStateMatcher } from '@angular/material/core';
import { SharedModule } from 'src/shared/shared.module';

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
	providers: [],
	exports: [RegisterCustomerComponent],
})
export class RegisterModule {
	static forRoot(
		countryPhoeCodeService: CountryPhoneCodeService
	): ModuleWithProviders<RegisterModule> {
		return {
			ngModule: RegisterModule,
			providers: [
				{
					provide: CountryPhoneCodeService,
					useExisting: countryPhoeCodeService,
				},
			],
		};
	}
}
