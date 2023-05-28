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
	private googleMapsApi = environment.googleMapsLink;
	private apiKey = environment.apiKey;

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
		const params = new HttpParams()
			.set('fields', 'user_ratings_total%2Crating%2Creviews')
			.set('key', this.apiKey);
		return this.getPlaceId(placeText || '').pipe(
			switchMap((place_id) => {
				params.set('place_id', place_id);
				return this.http
					.get<PlaceDetails>(
						`${this.googleMapsApi}/place/details/json`,
						{
							params: params,
						}
					)
					.pipe(
						map((googleData) => {
							return {
								...userData,
								reviews: googleData.reviews,
								ratings: googleData.rating,
								totalOpinions: googleData.user_ratings_total,
							};
						})
					);
			})
		);
	}

	private getPlaceId(placeText: string): Observable<string> {
		const params = new HttpParams()
			.set('fields', 'place_id')
			.set('inputtype', 'textquery')
			.set('input', placeText)
			.set('key', this.apiKey);
		return this.http
			.get<{ candidates: [{ place_id: string }] }>(
				`${this.googleMapsApi}/place/findplacefromtext/json`,
				{
					params: params,
				}
			)
			.pipe(
				map((googleData) => {
					return googleData.candidates[0].place_id;
				})
			);
	}
}
