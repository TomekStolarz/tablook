import { Injectable, Logger } from '@nestjs/common';
import { SearchRequest } from './models/search-request.interface';
import { UserService } from 'src/user/user.service';
import { OrderService } from 'src/order/order.service';
import { RestaurantSearchInfo } from './models/restaurant-search-info.interface';

@Injectable()
export class SearchService {
  private logger = new Logger(SearchService.name);
  constructor(
    private userService: UserService,
    private orderService: OrderService,
  ) {}

  async getAvailableRestaurant(
    request: SearchRequest,
  ): Promise<RestaurantSearchInfo[]> {
    const restaurants = await this.userService.findRestaurants(
      request.size,
      request.date,
      request.arrival,
      request.leave,
      request.query,
      request.location,
    );
    if (restaurants.length) {
      this.logger.log('Founded restaurant with passed criteria');
    } else {
      this.logger.warn('No restaurant with given criteria');
    }
    const results = await this.orderService.getFreeTables(restaurants, request);
    if (request.rating) {
      return results.filter((res) => res.rating >= request.rating);
    } else {
      return results;
    }
  }
}
