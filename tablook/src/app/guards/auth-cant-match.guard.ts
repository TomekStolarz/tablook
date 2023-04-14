import { inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectUser } from '../store/user.selector';
import { map } from 'rxjs';
import { UserInfo } from '../interfaces/user-info.interface';

export const authCantMatch: CanMatchFn = () => {
	const store = inject(Store);

	return store
		.select(selectUser)
		.pipe(map((userInfo: UserInfo) => !!userInfo));
};
