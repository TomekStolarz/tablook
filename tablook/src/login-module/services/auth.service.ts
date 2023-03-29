import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { jwt } from 'src/shared/interfaces/jwt.interface';
import { Response } from 'src/shared/interfaces/response.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	apiPath = environment.apiPath;

	constructor(private httpClient: HttpClient, private router: Router) {}

	login(user: User): Observable<Response<string>> {
		return this.httpClient
			.post<string>(`${this.apiPath}/auth/login`, user)
			.pipe(
				map((data: string) => ({ status: 200, data: data })),
				catchError((error: HttpErrorResponse) => {
					return of({
						status: error.status,
						data: error.error.message,
					});
				})
			);
	}

	logout() {}
}
