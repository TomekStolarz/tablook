import { Review } from 'src/shared/interfaces/review.interface';
import { UserInfo } from './user-info.interface';

export interface RestaurantInfo extends UserInfo {
	ratings?: number;
	reviews?: Review[];
	totalOpinions?: number;
}
