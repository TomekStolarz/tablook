import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/shared/shared.module';
import { RestaurantDetailsRoutingModule } from './restaurant-details-routing.module';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { MatIconModule } from '@angular/material/icon';
import { ReviewBoxComponent } from './components/review-box/review-box.component';

@NgModule({
	declarations: [RestaurantDetailsComponent, ReviewBoxComponent],
	imports: [
		SharedModule,
		CommonModule,
		RestaurantDetailsRoutingModule,
		NgImageSliderModule,
		MatIconModule,
	],
	exports: [],
})
export class RestaurantDetailsModule {}
