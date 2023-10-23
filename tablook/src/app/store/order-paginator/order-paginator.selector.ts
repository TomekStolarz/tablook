import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app-state.interface';

export const selectOrderPaginatorFeature = createFeatureSelector<AppState>('ordersPaginator');

export const selectOrderPaginator = createSelector(
	selectOrderPaginatorFeature,
	(state) => state.ordersPaginator
);
