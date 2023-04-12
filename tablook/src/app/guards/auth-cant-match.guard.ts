import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

export const authCantMatch: CanMatchFn = () => {
	const authService = inject(AuthService);

	return !authService.isAuth();
};
