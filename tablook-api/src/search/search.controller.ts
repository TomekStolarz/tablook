import { Body, Controller, Post } from '@nestjs/common';
import { SearchRequest } from './models/search-request.interface';
import { RestaurantSearchInfo } from './models/restaurant-search-info.interface';
import { SearchService } from './search.service';

@Controller('search')
export class SearchController {
  constructor(private searchService: SearchService) {}

  @Post()
  getSearch(@Body() request: SearchRequest): Promise<RestaurantSearchInfo[]> {
    return this.searchService.getAvailableRestaurant(request);
  }
}
