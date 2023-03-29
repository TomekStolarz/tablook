import {
	createAction,
	createActionGroup,
	emptyProps,
	props,
} from '@ngrx/store';
import { UserInfo } from '../interfaces/user-info.interface';

export const UserActions = createActionGroup({
	source: 'User',
	events: {
		'Add User': props<{ user: UserInfo }>(),
		'Remove User': emptyProps(),
	},
});
