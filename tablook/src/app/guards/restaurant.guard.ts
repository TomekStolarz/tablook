import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { firstValueFrom, map, switchMap } from 'rxjs';
import { selectUser } from '../store/user.selector';
import { AuthService } from '../services/auth.service';
import { UserType } from '../interfaces/user-type.enum';

export const restaurantGuard = () => {
	const store = inject(Store);
	const router = inject(Router);

	return inject(AuthService).isAuth().pipe(
		switchMap(() => firstValueFrom(store.pipe(
			select(selectUser),
			map((userInfo) => userInfo?.type)
		))),
		map((type) => {
			return type === UserType.RESTAURANT || router.parseUrl('/');
		})
	);
};