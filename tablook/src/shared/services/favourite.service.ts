import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, catchError, of, Observable, forkJoin, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomSnackbarService } from './custom-snackbar.service';
import { FavouriteResponse } from '../interfaces/favourites-respone.model';
import { RestaurantDetailsService } from 'src/home/restaurant-details/services/restaurant-details.service';
import { RestaurantFavouriteTile } from 'src/account-module/models/restaurant-favourite-tile';

@Injectable({
	providedIn: 'root',
})
export class FavouriteService {
	apiPath = environment.apiPath;

	private readonly detailsService = inject(RestaurantDetailsService);

	private readonly http = inject(HttpClient);

	private readonly snackbarService = inject(CustomSnackbarService);


	postFavourite(userId: string, favourite: string): Observable<boolean> {
		return this.http
			.post<{ message: string }>(`${this.apiPath}/favourite`, {
				userId: userId,
				favourite: favourite,
			})
			.pipe(
				map((message) => {
					this.snackbarService.success(message.message, 'Success');
					return true;
				}),
				catchError((x: HttpErrorResponse) => {
					this.snackbarService.error(
						x.message,
						'Error while adding to favourite'
					);
					return of(false);
				})
			);
	}

	deleteFavourite(userId: string, favourite: string): Observable<boolean> {
		return this.http
			.delete<{ message: string }>(`${this.apiPath}/favourite`, {
				body: { userId: userId, favourite: favourite },
			})
			.pipe(
				map((message) => {
					this.snackbarService.success(message.message, 'Success');
					return true;
				}),
				catchError((x: HttpErrorResponse) => {
					this.snackbarService.error(
						x.message,
						'Error while removing from favourite'
					);
					return of(false);
				})
			);
	}

	getFavourites(userid: string): Observable<RestaurantFavouriteTile[]> {
		return this.http.get<FavouriteResponse>(`${this.apiPath}/favourite/${userid}`).pipe(
			map((favourites) =>
				favourites.favourite.map((fav) => this.detailsService.getRestaurantDetails(fav, false))
		  	),
			switchMap((favs) => forkJoin(favs)),
			map((restaurantInfo) => 
				restaurantInfo.map((restaurant) => {
					return {
						...restaurant,
						address: restaurant.details?.address || {
							city: 'string',
							country: '',
							zip: '',
							street: '',
							flat: '',
						},
						isFavourite: true,
						tags: restaurant.details?.tags || [],
						image: restaurant.details?.images[0] || ''
					}		
				})
			)
		);
	}

	isRestaurantFavourite(
		userId: string,
		restaurantId: string
	): Observable<boolean> {
		return this.http
			.post<{ isFavourite: boolean }>(
				`${this.apiPath}/favourite/${userId}`,
				{ restaurantId: restaurantId }
			)
			.pipe(
				map((x) => {
					return x.isFavourite;
				})
			);
	}
}
