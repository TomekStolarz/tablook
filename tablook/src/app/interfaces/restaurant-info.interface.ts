import { Review } from 'src/shared/interfaces/review.interface';
import { UserInfo } from './user-info.interface';
import { TableResult } from 'src/home/search-module/interfaces/table-result.interface';

export interface RestaurantInfo extends UserInfo {
	ratings?: number;
	reviews?: Review[];
	totalOpinions?: number;
	place_id?: string;
	isFavourite?: boolean;
	freeTables?: TableResult[];
}
