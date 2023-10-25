import { Injectable, Logger } from '@nestjs/common';
import { SearchRequest } from './models/search-request.interface';
import { UserService } from 'src/user/user.service';
import { OrderService } from 'src/order/order.service';
import { RestaurantSearchInfo } from './models/restaurant-search-info.interface';
import { Sorting } from './models/sorting.type';
import { FavouriteService } from 'src/favourite/favourite.service';

@Injectable()
export class SearchService {
  private logger = new Logger(SearchService.name);
  constructor(
    private userService: UserService,
    private orderService: OrderService,
    private favService: FavouriteService,
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

    let results = await this.orderService.getFreeTables(restaurants, request);
    if (request.sortBy) {
      results = await this.sortRestaurant(
        results,
        request.sortBy,
        request.userId,
      );
    }
    if (request.rating) {
      return results.filter((res) => res.rating >= request.rating);
    } else {
      return results;
    }
  }

  private sortingKeys: { [key: string]: string } = {
    'Total opinions': 'totalOpinions',
    Rating: 'rating',
    'Free tables': 'freeTables',
    'Restaurant name': 'name',
    Favourite: 'favourite',
  };

  private async sortRestaurant(
    restaurants: RestaurantSearchInfo[],
    sortBy: Sorting,
    userId?: string,
  ) {
    if (this.sortingKeys[sortBy.key] === 'favourite' && userId) {
      const restIsFav = await Promise.all(
        restaurants.map(async (restaurant) => {
          return await this.favService
            .isRestaurantFavourite(userId, restaurant.id)
            .then((isFav) => ({ ...restaurant, isfavourite: isFav }));
        }),
      );
      const sorted = [...restIsFav].sort((a, b) => {
        return (
          (Number(a.isfavourite.isFavourite) -
            Number(b.isfavourite.isFavourite)) *
          -1
        );
      });
      return sorted.map((rest) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { isfavourite, ...restaurant } = rest;
        return restaurant;
      });
    }
    const sortFunction = this.sortRestaurantByKey(sortBy);
    return [...restaurants].sort(sortFunction);
  }

  private sortRestaurantByKey(sortBy: Sorting) {
    const sort = (a: RestaurantSearchInfo, b: RestaurantSearchInfo): number => {
      const aField = a[this.sortingKeys[sortBy.key]];
      const bField = b[this.sortingKeys[sortBy.key]];
      if (typeof aField === 'string') {
        return (
          aField.localeCompare(bField, 'en', {
            sensitivity: 'base',
            ignorePunctuation: true,
          }) * sortBy.direction
        );
      }

      return (aField - bField) * sortBy.direction;
    };
    return sort;
  }
}
