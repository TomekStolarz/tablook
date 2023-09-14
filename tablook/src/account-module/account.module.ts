import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './components/account.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from 'src/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { SettingsComponent } from './components/settings/settings.component';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { ContactComponent } from './components/contact/contact.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CountryPhoneCodeService } from 'src/register-module/services/country-phone-code.service.interface';
import { TbCountryPhoneCodeService } from 'src/app/services/tb-country-phone-code.service';
import { MatIconModule } from '@angular/material/icon';
import { SettingComponent } from './components/settings/setting/setting.component';
import { FavTileComponent } from './components/favourites/fav-tile/fav-tile.component';
import { MatTooltipModule } from '@angular/material/tooltip';



@NgModule({
  declarations: [
    AccountComponent,
    SettingsComponent,
    ReservationsComponent,
    FavouritesComponent,
    ContactComponent,
    SettingComponent,
    FavTileComponent
  ],
  providers: [
		{
			provide: CountryPhoneCodeService,
			useClass: TbCountryPhoneCodeService,
		},
	],
  imports: [
    CommonModule,
    AccountRoutingModule,
    SharedModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    FormsModule,
  ]
})
export class AccountModule { }
