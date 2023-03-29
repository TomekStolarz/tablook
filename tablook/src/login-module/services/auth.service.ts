import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, of } from 'rxjs';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { UserActions } from 'src/app/store/user.actions';
import { environment } from 'src/environments/environment';
import { jwt } from 'src/shared/interfaces/jwt.interface';
import { Response } from 'src/shared/interfaces/response.interface';
import { User } from '../interfaces/user.interface';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	apiPath = environment.apiPath;

	constructor(
		private httpClient: HttpClient,
		private router: Router,
		private cookieService: CookieService,
		private store: Store
	) {}

	login(user: User): Observable<Response<UserInfo | string>> {
		return this.httpClient
			.post<UserInfo>(`${this.apiPath}/auth/login`, user)
			.pipe(
				map((data: UserInfo) => {
					this.store.dispatch(UserActions.addUser({ user: data }));
					return { status: 200, data: data };
				}),
				catchError((error: HttpErrorResponse) => {
					return of({
						status: error.status,
						data: error.error.message,
					});
				})
			);
	}

	logout() {
		this.store.dispatch(UserActions.removeUser());
		this.cookieService.delete('auth-cookie');
		this.router.navigateByUrl('/');
	}
}
