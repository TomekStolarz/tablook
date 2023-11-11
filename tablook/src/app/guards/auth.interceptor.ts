import {
	HttpErrorResponse,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, catchError, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	private readonly router = inject(Router);

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		const authReq = req.clone({
			withCredentials: true,
		});
		return next.handle(authReq).pipe(catchError((error: HttpErrorResponse) => {
			if (error.status === 401) {
				this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
					this.router.navigate(['login']);
				  });
				return EMPTY;
			}
			console.error(error)
			throw error;
		}));
	}
}
