import { createReducer, on } from '@ngrx/store';

import { OrderPaginatorAction } from './order-paginator.actions';
import { AppState, initialState } from '../app-state.interface';

export const orderPaginatorReducer = createReducer(
	initialState,
	on(OrderPaginatorAction.setPageindex, (_state, { pageIndex }): AppState => {
		_state = {..._state, ordersPaginator: {..._state.ordersPaginator, pageIndex: pageIndex,  }};
		return _state;
	}),
	on(OrderPaginatorAction.setPagesize, (_state, { pageSize }): AppState => {
		_state = {..._state, ordersPaginator: {..._state.ordersPaginator, pageSize: pageSize,  }};
		return _state;
	})
);
