import {
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private localStorage: LocalStorageService) {}

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		const authToken = this.localStorage.get('token');

		if (!authToken) {
			return next.handle(req);
		}

		const authReq = req.clone({
			setHeaders: {
				Authorization: `Bearer ${authToken}`,
			},
		});
		return next.handle(authReq);
	}
}
