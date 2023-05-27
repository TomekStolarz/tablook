import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RestaurantDetailsService } from '../../services/restaurant-details.service';
import { UserInfo } from 'src/app/interfaces/user-info.interface';

@Component({
	selector: 'app-restaurant-details',
	templateUrl: './restaurant-details.component.html',
})
export class RestaurantDetailsComponent implements OnInit, OnDestroy {
	private subscriptions: Subscription[] = [];

	restaurantDetails?: UserInfo;

	constructor(
		private route: ActivatedRoute,
		private restaurantService: RestaurantDetailsService
	) {}

	ngOnInit(): void {
		const sub = this.route.params.subscribe((params) => {
			const detSub = this.restaurantService
				.getRestaurantDetails(params['id'])
				.subscribe((info) => (this.restaurantDetails = info));
			this.subscriptions.push(detSub);
		});
		this.subscriptions.push(sub);
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((sub) => sub.unsubscribe());
	}
}
