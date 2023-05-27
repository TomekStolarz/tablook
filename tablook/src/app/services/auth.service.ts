import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from 'src/shared/interfaces/response.interface';
import { UserInfo } from '../interfaces/user-info.interface';
import { UserActions } from '../store/user.actions';
import { User } from 'src/login-module/interfaces/user.interface';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	apiPath = environment.apiPath;

	constructor(
		private httpClient: HttpClient,
		private router: Router,
		private store: Store
	) {}

	login(user: User): Observable<Response<UserInfo | string>> {
		const httpOptions = {
			withCredentials: true,
		};
		return this.httpClient
			.post<UserInfo>(`${this.apiPath}/auth/login`, user, httpOptions)
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
		this.httpClient.post(`${this.apiPath}/auth/logout`, {}).subscribe((_) => this.router.navigateByUrl('/'))
		
	}

	isAuth() {
		return this.httpClient.get(`${this.apiPath}/auth`).pipe(
			map((data: UserInfo) => {
				this.store.dispatch(UserActions.addUser({ user: data }));
				return { status: 200, data: data };
			})
		);
	}
}
