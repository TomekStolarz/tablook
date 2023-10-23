import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/shared/shared.module';
import { RestaurantDetailsRoutingModule } from './restaurant-details-routing.module';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { MatIconModule } from '@angular/material/icon';
import { ReviewBoxComponent } from './components/review-box/review-box.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FilterModule } from 'src/filters-module/filters.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { OrderComponent } from './components/order/order.component';

@NgModule({
	declarations: [
		RestaurantDetailsComponent,
		ReviewBoxComponent,
	],
	imports: [
		SharedModule,
		CommonModule,
		RestaurantDetailsRoutingModule,
		NgImageSliderModule,
		MatIconModule,
		MatTooltipModule,
		FilterModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatSelectModule,
		OrderComponent,
	],
	exports: [],
})
export class RestaurantDetailsModule {}
