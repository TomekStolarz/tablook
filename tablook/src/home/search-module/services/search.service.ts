import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestaurantSearchInfo } from '../interfaces/restaurant-search-info.interface';
import { BehaviorSubject, catchError, connectable, finalize, of, take, tap } from 'rxjs';
import { SearchRequest } from '../interfaces/search-request.interface';
import { CustomSnackbarService } from 'src/shared/services/custom-snackbar.service';

@Injectable({
	providedIn: 'root',
})
export class SearchService {
	apiPath = environment.apiPath;
	searchResults: RestaurantSearchInfo[] = [];
	searchResults$: BehaviorSubject<RestaurantSearchInfo[]> =
		new BehaviorSubject<RestaurantSearchInfo[]>([]);
	isSearching$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
	lastSearchedQuery?: SearchRequest;

	constructor(
		private http: HttpClient,
		private customSnackbarService: CustomSnackbarService
	) {}

	search(searchQuery: SearchRequest) {
		this.isSearching$.next(true);
		if (
			this.lastSearchedQuery &&
			Object.entries(searchQuery).join('') ===
				Object.entries(this.lastSearchedQuery).join('')
		) {
			this.searchResults$.next(this.searchResults);
			return;
		}
		this.lastSearchedQuery = searchQuery;
		connectable(this.http
			.post<RestaurantSearchInfo[]>(`${this.apiPath}/search`, searchQuery)
			.pipe(
				tap((results) => {
					this.searchResults = results;
					this.searchResults$.next(this.searchResults);
				}),
				take(1),
				catchError((error: HttpErrorResponse) => {
					this.customSnackbarService.error(
						`Error occured on search ${error.message}`,
						`Cannot search table`
					);
					return of([]);
				}),
				finalize(() => {
					this.isSearching$.next(false);
				})
			)).connect();
	}

	filterResults(filterKey: string) {
		const date = new Date();
		const request = {
			date: date.toISOString(),
			size: 1,
			arrival: `${date.getHours()}:${date.getMinutes()}`,
			query: filterKey,
		};
		this.search(request);
	}
}
