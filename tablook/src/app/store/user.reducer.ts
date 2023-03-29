import { createReducer, on } from '@ngrx/store';
import { UserInfo } from '../interfaces/user-info.interface';
import { State } from '../reducers';
import { UserActions } from './user.actions';
export const initialState: UserInfo = {};

export const userReducer = createReducer(
	initialState,
	on(UserActions.addUser, (_state, { user }): State => {
		_state = { ...user };
		return _state;
	}),
	on(UserActions.removeUser, (_state): State => initialState)
);
