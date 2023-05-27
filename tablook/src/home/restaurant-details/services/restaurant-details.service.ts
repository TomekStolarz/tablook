import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class RestaurantDetailsService {
	apiPath = environment.apiPath;

	constructor(private http: HttpClient) {}

	getRestaurantDetails(id: string): Observable<UserInfo> {
		return this.http.get<UserInfo>(`${this.apiPath}/restaurant/${id}`);
	}
}
