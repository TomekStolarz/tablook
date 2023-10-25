import { Body, Controller, Post } from '@nestjs/common';
import { SearchRequest } from './models/search-request.interface';
import { RestaurantSearchInfo } from './models/restaurant-search-info.interface';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  private lastesResult: RestaurantSearchInfo[];

  @Post()
  async getSearch(
    @Body() request: SearchRequest,
  ): Promise<RestaurantSearchInfo[]> {
    if (request.pageIndex === 1) {
      this.lastesResult = await this.searchService.getAvailableRestaurant(
        request,
      );
      return this.lastesResult.slice(0, 10 * request.pageIndex - 1);
    } else {
      return this.lastesResult.slice(
        10 * request.pageIndex,
        10 * request.pageIndex - 1,
      );
    }
  }
}
