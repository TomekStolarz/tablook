import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RestaurantDetailsService } from '../../services/restaurant-details.service';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { ImageData } from 'src/shared/interfaces/image-data.interface';

@Component({
	selector: 'app-restaurant-details',
	templateUrl: './restaurant-details.component.html',
})
export class RestaurantDetailsComponent implements OnInit, OnDestroy {
	private subscriptions: Subscription[] = [];

	restaurantDetails?: UserInfo;

	imagesData: ImageData[] = [];

	constructor(
		private route: ActivatedRoute,
		private restaurantService: RestaurantDetailsService
	) {}

	ngOnInit(): void {
		const sub = this.route.params.subscribe((params) => {
			const detSub = this.restaurantService
				.getRestaurantDetails(params['id'], true)
				.subscribe((info) => {
					this.restaurantDetails = info;
					this.imagesData = [];
					if (this.restaurantDetails.details?.images) {
						this.imagesData =
							this.restaurantDetails.details.images.map(
								(image) => ({
									image: `http://localhost:3000/file/${image}`,
									thumbImage: `http://localhost:3000/file/${image}`,
									alt: 'Restaurant photo',
								})
							);
					}
				});
			this.subscriptions.push(detSub);
		});
		this.subscriptions.push(sub);
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((sub) => sub.unsubscribe());
	}
}
