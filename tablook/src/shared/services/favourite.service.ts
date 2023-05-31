import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomSnackbarService } from './custom-snackbar.service';

@Injectable({
	providedIn: 'root',
})
export class FavouriteService {
	apiPath = environment.apiPath;

	constructor(
		private http: HttpClient,
		private snackbarService: CustomSnackbarService
	) {}

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
