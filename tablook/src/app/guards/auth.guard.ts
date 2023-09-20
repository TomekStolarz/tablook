import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { connectable, firstValueFrom, map, switchMap, tap } from 'rxjs';
import { selectUser } from '../store/user.selector';
import { AuthService } from '../services/auth.service';

export const authGuard = () => {
	const store = inject(Store);
	const router = inject(Router);

	return inject(AuthService).isAuth().pipe(
		switchMap(() => firstValueFrom(store.pipe(
			select(selectUser),
			map((userInfo) => !!userInfo?.id)
		))),
		map((isAuth) => {
			return isAuth || router.parseUrl('/login');
		})
	);
};
