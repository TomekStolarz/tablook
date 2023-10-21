import { UserInfo } from 'src/user/models/user-info.interface';
import { RestaurantSearchInfo } from './restaurant-search-info.interface';

export type RestaurantFind = UserInfo &
  Pick<RestaurantSearchInfo, 'todayHours'>;
