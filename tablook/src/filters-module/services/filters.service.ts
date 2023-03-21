import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { FastFilter } from '../models/fast-filter.interface';

@Injectable({
	providedIn: 'root',
})
export class FiltersService {
	constructor(private http: HttpClient) {}

	filterResults(filterName: string) {}

	getFastFilters(): Observable<FastFilter[]> {
		return this.http.get<FastFilter[]>(`/filters`).pipe(
			catchError((err) => {
				console.log(err);
				return [];
			})
		);
	}
}
