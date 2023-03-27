import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterData } from '../interfaces/register-data.interface';
import { Response } from 'src/common/interfaces/response.interface';
import { UserType } from '../interfaces/user-type.enum';

@Injectable({
	providedIn: 'root',
})
export class RegisterService {
	constructor(private httpClient: HttpClient) {}

	private apiPath = environment.apiPath;
	registerCustomer(userData: Partial<RegisterData>) {
		userData.type = UserType.CUSTOMER;
		return this.httpClient
			.post<Response<string>>(`${this.apiPath}/user`, userData)
			.pipe(
				map((data) => ({
					status: 201,
					message: 'Successfully created',
				})),
				catchError((error: HttpErrorResponse) => {
					return of({ status: error.status, message: error.message });
				})
			);
	}
}
