import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RestaurantDetailsService } from '../../services/restaurant-details.service';
import { ImageData } from 'src/shared/interfaces/image-data.interface';
import { RestaurantInfo } from 'src/app/interfaces/restaurant-info.interface';
import { apiKey } from 'api-key';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/store/user.selector';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { FavouriteService } from 'src/shared/services/favourite.service';

@Component({
	selector: 'app-restaurant-details',
	templateUrl: './restaurant-details.component.html',
})
export class RestaurantDetailsComponent implements OnInit, OnDestroy {
	private subscriptions: Subscription[] = [];
	user?: UserInfo;
	user$ = this.store.select(selectUser);

	restaurantDetails!: RestaurantInfo;

	imagesData: ImageData[] = [];

	constructor(
		private route: ActivatedRoute,
		private restaurantService: RestaurantDetailsService,
		private store: Store,
		private favouriteService: FavouriteService
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
					if (this.user) {
						const favSub = this.favouriteService
							.isRestaurantFavourite(
								this.user?.id || '',
								this.restaurantDetails.id || ''
							)
							.subscribe((x) => {
								this.restaurantDetails.isFavourite = x;
							});
						this.subscriptions.push(favSub);
					}
				});
			this.subscriptions.push(detSub);
		});
		this.subscriptions.push(sub);
		const userSub = this.user$.subscribe((user) => {
			this.user = user;
		});
		this.subscriptions.push(userSub);
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((sub) => sub.unsubscribe());
	}

	get url(): string {
		return `https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(
			this.restaurantDetails?.details?.googleMapsLink || ''
		)}&key=${apiKey}`;
	}

	addToFav() {
		if (this.user?.id && this.restaurantDetails?.id) {
			this.favouriteService
				.postFavourite(this.user.id, this.restaurantDetails?.id)
				.subscribe((x) => {
					if (x) {
						this.restaurantDetails.isFavourite = true;
					}
				});
		}
	}

	deleteFromFav() {
		if (this.user?.id && this.restaurantDetails?.id) {
			this.favouriteService
				.deleteFavourite(this.user.id, this.restaurantDetails?.id)
				.subscribe((x) => {
					if (x) {
						this.restaurantDetails.isFavourite = false;
					}
				});
		}
	}

	handleFavChange() {
		if (!this.restaurantDetails?.isFavourite) {
			this.addToFav();
		} else {
			this.deleteFromFav();
		}
	}
}
