import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/shared/shared.module';
import { RestaurantDetailsRoutingModule } from './restaurant-details-routing.module';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';

@NgModule({
	declarations: [
    RestaurantDetailsComponent
  ],
	imports: [SharedModule, CommonModule, RestaurantDetailsRoutingModule],
	exports: [],
})
export class RestaurantDetailsModule {}
