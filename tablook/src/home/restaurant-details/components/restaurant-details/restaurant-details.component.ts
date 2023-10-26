import { Component, OnDestroy, OnInit, inject } from '@angular/core';
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
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { DialogService } from 'src/shared/services/dialog.service';
import { ImageDialogViewerComponent } from 'src/shared/components/image-dialog-viewer/image-dialog-viewer.component';

@Component({
	selector: 'app-restaurant-details',
	templateUrl: './restaurant-details.component.html',
})
export class RestaurantDetailsComponent implements OnInit, OnDestroy {
	private subscriptions: Subscription[] = [];
	user?: UserInfo;
	user$ = this.store.select(selectUser);
	isMobile = false;

	restaurantDetails!: RestaurantInfo;

	imagesData: ImageData[] = [];

	selectedDay: string = '';

	private readonly dialogService = inject(DialogService);

	constructor(
		private route: ActivatedRoute,
		private restaurantService: RestaurantDetailsService,
		private store: Store,
		private favouriteService: FavouriteService,
		private responsive: BreakpointObserver,
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

		const respSub = this.responsive.observe([Breakpoints.TabletPortrait, Breakpoints.HandsetPortrait])
			.subscribe((result) => {
				if (result.matches) {
					this.isMobile = true;
				} else {
					this.isMobile = false;
				}
			});

		this.subscriptions.push(respSub);
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((sub) => sub.unsubscribe());
	}

	get url(): string {
		return `https://www.google.com/maps/embed/v1/place?q=place_id:${
			this.restaurantDetails?.place_id || ''
		}&key=${apiKey}`;
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

	handleDateChange(date: Date) {
		this.selectedDay = new Date(date)
		.toLocaleDateString('en-US', {
		  weekday: 'long',
		})
			.toLowerCase();
	}

	openImageDialog(image?: string) {
		this.dialogService.openDialog(ImageDialogViewerComponent, image);
	}
}
