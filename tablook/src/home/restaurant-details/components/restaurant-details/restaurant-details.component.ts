import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RestaurantDetailsService } from '../../services/restaurant-details.service';
import { ImageData } from 'src/shared/interfaces/image-data.interface';
import { RestaurantInfo } from 'src/app/interfaces/restaurant-info.interface';
import { DomSanitizer } from '@angular/platform-browser';
import { apiKey } from 'api-key';

@Component({
	selector: 'app-restaurant-details',
	templateUrl: './restaurant-details.component.html',
})
export class RestaurantDetailsComponent implements OnInit, OnDestroy {
	private subscriptions: Subscription[] = [];

	restaurantDetails?: RestaurantInfo;

	imagesData: ImageData[] = [];

	constructor(
		private route: ActivatedRoute,
		private restaurantService: RestaurantDetailsService,
		private sanitizer: DomSanitizer
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

	get url(): string {
		return `https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(
			this.restaurantDetails?.details?.googleMapsLink || ''
		)}&key=${apiKey}`;
	}
}
