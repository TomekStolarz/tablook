import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, combineLatestWith, map, of, switchMap } from 'rxjs';
import { RestaurantInfo } from 'src/app/interfaces/restaurant-info.interface';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { environment } from 'src/environments/environment';
import { FreeTable } from 'src/home/search-module/interfaces/free-table.interface';
import { SearchRequest } from 'src/home/search-module/interfaces/search-request.interface';
import { TableResult } from 'src/home/search-module/interfaces/table-result.interface';
import { SearchService } from 'src/home/search-module/services/search.service';
import { PlaceDetails } from 'src/shared/interfaces/place-details.interface';

@Injectable({
	providedIn: 'root',
})
export class RestaurantDetailsService {
	apiPath = environment.apiPath;

	constructor(private http: HttpClient, private searchService: SearchService) {}

	getRestaurantDetails(
		id: string,
		enhancedQuery: boolean
	): Observable<RestaurantInfo> {
		if (enhancedQuery) {
			return this.http
				.get<UserInfo>(`${this.apiPath}/restaurant/${id}`)
				.pipe(
					switchMap((userData) => this.getDetailsFromGoogle(userData)),
					combineLatestWith(this.getFreeTables(id, this.searchService.lastSearchedQuery)),
					map(([resData, freeTables]) => {
						const properFreeTables: TableResult[] = freeTables.map((table) => {
							const _table = resData.details?.tables.find(
							  (tb) => (tb.id === table.tableId),
							);
							return {
							  id: _table?.id || '',
							  seats: _table?.seats || 1,
							  available: table.available,
							};
						  });
						return {
							...resData,
							freeTables: properFreeTables
						}
					})
				);
		}
		return this.http.get<UserInfo>(`${this.apiPath}/restaurant/${id}`);
	}

	getRestaurantOrderDetails(id: string): Observable<RestaurantInfo> {
		return this.http.get<UserInfo>(`${this.apiPath}/restaurant/${id}`)
			.pipe(
				combineLatestWith(this.getFreeTables(id)),
				map(([resData, freeTables]) => {
					const properFreeTables: TableResult[] = freeTables.map((table) => {
						const _table = resData.details?.tables.find(
						  (tb) => (tb.id === table.tableId),
						);
						return {
						  id: _table?.id || '',
						  seats: _table?.seats || 1,
						  available: table.available,
						};
					  });
					return {
						...resData,
						freeTables: properFreeTables
					}
				})
				);
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
				}),
				catchError(() => {
					return of({ ...userData, reviews: [], ratings: 0, totalOpinions: 0 });
				})
			);
	}

	getFreeTables(restaurantId: string, searchRequest?: SearchRequest): Observable<FreeTable[]> {
		const basicRequest = {
			date: new Date().toISOString(),
			size: 1,
		};
		const body = {
			...searchRequest ?? basicRequest
		}
		return this.http.post<FreeTable[]>(`${this.apiPath}/order/freetable/${restaurantId}`, body);
	}
}
