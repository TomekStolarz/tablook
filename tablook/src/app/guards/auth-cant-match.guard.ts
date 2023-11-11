import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { firstValueFrom, map, switchMap } from 'rxjs';
import { selectUser } from '../store/user.selector';
import { AuthService } from '../services/auth.service';

export const authCantMatch: CanMatchFn = async () => {
	const store = inject(Store);
	const canMatch = await firstValueFrom(
		inject(AuthService).isAuth().pipe(switchMap(() => {
			return store.pipe(
				select(selectUser),
				map((userInfo) => !userInfo?.id)
			)
		}))
	);

	return canMatch;
};
