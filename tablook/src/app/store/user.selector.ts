import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './app-state.interface';

export const selectUserFeature = createFeatureSelector<AppState>('user');

export const selectUser = createSelector(
	selectUserFeature,
	(state) => state?.user
);
