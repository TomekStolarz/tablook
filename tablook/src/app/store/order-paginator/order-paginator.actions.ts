import { createActionGroup, props } from '@ngrx/store';

export const OrderPaginatorAction = createActionGroup({
	source: 'OrderPaginatorState',
	events: {
		'Set pageIndex': props<{ pageIndex: number }>(),
		'Set pageSize': props<{ pageSize: number }>(),
	},
});
