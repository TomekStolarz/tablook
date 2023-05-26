import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterData } from '../interfaces/register-data.interface';
import { Response } from 'src/shared/interfaces/response.interface';
import { UserType } from '../../app/interfaces/user-type.enum';
import { FilesService } from 'src/shared/services/files.service';

@Injectable({
	providedIn: 'root',
})
export class RegisterService {
	constructor(
		private httpClient: HttpClient,
		private fileService: FilesService
	) {}

	private apiPath = environment.apiPath;
	registerCustomer(userData: Partial<RegisterData>) {
		userData.type = UserType.CUSTOMER;
		return this.httpClient
			.post<Response<string>>(`${this.apiPath}/auth/register`, userData)
			.pipe(
				map((data) => ({
					status: 201,
					message: 'Successfully created',
				})),
				catchError((error: HttpErrorResponse) => {
					return of({
						status: error.status,
						message: error.error.message,
					});
				})
			);
	}

	registerRestaurant(userData: RegisterData) {
		userData.type = UserType.RESTAURANT;
		return this.httpClient
			.post<Response<string>>(`${this.apiPath}/auth/register`, userData)
			.pipe(
				map((data) => ({
					status: 201,
					message: 'Successfully created',
				})),
				catchError((error: HttpErrorResponse) => {
					return of({
						status: error.status,
						message: error.error.message,
					});
				})
			);
	}
}
