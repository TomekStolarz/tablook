import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, of, switchMap } from 'rxjs';
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
	register(userData: Partial<RegisterData>, userType: UserType) {
		userData.type = userType;
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

	registerRestaurant(
		userData: RegisterData,
		images: File[],
		tablePlan: File
	) {
		return this.fileService.sendImages(images, tablePlan).pipe(
			map((imagesData): RegisterData => {
				return {
					...userData,
					details: {
						...userData.details,
						images: imagesData.images,
						tablesMap: imagesData.tablePlanName[0],
					},
				};
			}),
			switchMap((x) => this.register(x, UserType.RESTAURANT))
		);
	}
}
