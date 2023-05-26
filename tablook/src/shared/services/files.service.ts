import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class FilesService {
	apiPath = environment.apiPath;

	constructor(private httpClient: HttpClient) {}

	sendImages(images: File[], tablesMap: File) {
		return this.httpClient.post(`${this.apiPath}/file`, {
			images: images,
			tablePlan: tablesMap,
		});
	}
}
