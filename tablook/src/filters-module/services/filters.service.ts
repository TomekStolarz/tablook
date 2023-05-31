import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { FastFilter } from '../models/fast-filter.interface';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class FiltersService {
	apiPath = environment.apiPath;

	constructor(private http: HttpClient) {}

	getFastFilters(): Observable<FastFilter[]> {
		return this.http.get<FastFilter[]>(`${this.apiPath}/fastFilter`).pipe(
			catchError((err) => {
				console.log(err);
				return [];
			})
		);
	}
}
