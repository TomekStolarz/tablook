import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { firstValueFrom, map } from 'rxjs';
import { selectUser } from '../store/user.selector';

export const authGuard = async () => {
	const router = inject(Router);
	const store = inject(Store);
	const isAuth = await firstValueFrom(
		store.pipe(
			select(selectUser),
			map((userInfo) => !!userInfo?.id)
		)
	);

	return isAuth || router.parseUrl('/login');
};
