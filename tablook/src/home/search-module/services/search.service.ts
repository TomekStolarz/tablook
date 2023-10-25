import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { RestaurantSearchInfo } from '../interfaces/restaurant-search-info.interface';
import { BehaviorSubject, catchError, connectable, finalize, of, take, tap } from 'rxjs';
import { SearchRequest } from '../interfaces/search-request.interface';
import { CustomSnackbarService } from 'src/shared/services/custom-snackbar.service';
import { Sorting } from '../interfaces/sorting.model';

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
		if (
			this.lastSearchedQuery &&
			this.searchRequestToString(searchQuery) ===
			this.searchRequestToString(this.lastSearchedQuery)
		) {
			this.searchResults$.next(this.searchResults);
			return;
		}
		this.isSearching$.next(true);
		this.lastSearchedQuery = searchQuery;;
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

	loadNextChunk(pageIndex: number) {
		const searchQuery = {...this.lastSearchedQuery, pageIndex: pageIndex}
		connectable(this.http
			.post<RestaurantSearchInfo[]>(`${this.apiPath}/search`, searchQuery)
			.pipe(
				tap((results) => {
					this.searchResults = this.searchResults.concat(results);
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
			)).connect();
	}

	filterResults(filterKey: string) {
		const date = new Date();
		const request = {
			date: date.toISOString(),
			pageIndex: 1,
			size: 1,
			arrival: `${date.getHours()}:${date.getMinutes()}`,
			query: filterKey,
		};
		this.search(request);
	}

	private searchRequestToString(searchQuery: SearchRequest): string {
		return Object.entries(searchQuery).map(([key, value]) => {
			if (key !== 'sortBy') {
				return `${key}: ${value}`
			} else {
				return `${key}: ${Object.entries(value).join('')}`
			}
		}).join('')
	}
}
