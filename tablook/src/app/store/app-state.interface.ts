import { PaginatorData } from "../interfaces/paginator.model";
import { UserInfo } from "../interfaces/user-info.interface";

export interface AppState {
    user?: UserInfo;
    ordersPaginator: PaginatorData;
}

export const initialState: AppState = {
    ordersPaginator: {
        pageIndex: 0,
        pageSize: 20,
    }
};
