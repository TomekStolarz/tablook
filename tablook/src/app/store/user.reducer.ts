import { createReducer, on } from '@ngrx/store';
import { UserActions } from './user.actions';
import { AppState, initialState } from './app-state.interface';

export const userReducer = createReducer(
	initialState,
	on(UserActions.addUser, (_state, { user }): AppState => {
		_state = {..._state, user: { ...user } };
		return _state;
	}),
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	on(UserActions.removeUser, (_state): AppState => initialState)
);
