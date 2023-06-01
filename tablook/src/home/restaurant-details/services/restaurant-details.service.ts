import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, switchMap } from 'rxjs';
import { RestaurantInfo } from 'src/app/interfaces/restaurant-info.interface';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { environment } from 'src/environments/environment';
import { PlaceDetails } from 'src/shared/interfaces/place-details.interface';

@Injectable({
	providedIn: 'root',
})
export class RestaurantDetailsService {
	apiPath = environment.apiPath;

	constructor(private http: HttpClient) {}

	getRestaurantDetails(
		id: string,
		enhancedQuery: boolean
	): Observable<RestaurantInfo> {
		if (enhancedQuery) {
			return this.http
				.get<UserInfo>(`${this.apiPath}/restaurant/${id}`)
				.pipe(
					switchMap((userData) => this.getDetailsFromGoogle(userData))
				);
		}
		return this.http.get<UserInfo>(`${this.apiPath}/restaurant/${id}`);
	}

	private getDetailsFromGoogle(
		userData: UserInfo
	): Observable<RestaurantInfo> {
		const placeText = userData.details?.googleMapsLink.match(
			/(?<=place\/).*?(?=\/)/
		)?.[0];
		return this.http
			.get<PlaceDetails>(`${this.apiPath}/restaurant/place/${placeText}`)
			.pipe(
				map((googleData) => {
					return {
						...userData,
						reviews: googleData.reviews,
						ratings: googleData.rating,
						totalOpinions: googleData.user_ratings_total,
						place_id: googleData.place_id
					};
				})
			);
	}
}
