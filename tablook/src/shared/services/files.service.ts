import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class FilesService {
	apiPath = environment.apiPath;

	constructor(private httpClient: HttpClient) {}

	sendImages(
		images: File[],
		tablesMap: File
	): Observable<{ images: string[]; tablePlanName: string[] }> {
		const formData = new FormData();
		images.forEach((image) => formData.append('images', image));
		formData.append('tablePlan', tablesMap);
		return this.httpClient.post<{
			images: string[];
			tablePlanName: string[];
		}>(`${this.apiPath}/file`, formData);
	}
}
