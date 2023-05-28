import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/shared/shared.module';
import { RestaurantDetailsRoutingModule } from './restaurant-details-routing.module';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';
import { NgImageSliderModule } from 'ng-image-slider';

@NgModule({
	declarations: [RestaurantDetailsComponent],
	imports: [
		SharedModule,
		CommonModule,
		RestaurantDetailsRoutingModule,
		NgImageSliderModule,
	],
	exports: [],
})
export class RestaurantDetailsModule {}
