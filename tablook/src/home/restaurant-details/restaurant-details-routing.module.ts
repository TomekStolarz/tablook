import { NgModule } from '@angular/core';
import { RouterModule, Route } from '@angular/router';
import { RestaurantDetailsComponent } from './components/restaurant-details/restaurant-details.component';

const routes: Route[] = [
	{ path: ':id', component: RestaurantDetailsComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RestaurantDetailsRoutingModule {}
