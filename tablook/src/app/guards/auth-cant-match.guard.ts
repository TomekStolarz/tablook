import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { firstValueFrom, map } from 'rxjs';
import { selectUser } from '../store/user.selector';

export const authCantMatch: CanMatchFn = async () => {
	const store = inject(Store);
	const canMatch = await firstValueFrom(
		store.pipe(
			select(selectUser),
			map((userInfo) => !userInfo?.id)
		)
	);

	return canMatch;
};
