import { Controller, Param, Get } from '@nestjs/common';
import { UserInfo } from 'src/user/models/user-info.interface';
import { UserService } from 'src/user/user.service';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(
    private readonly userService: UserService,
    private restaurantService: RestaurantService,
  ) {}

  @Get(':id')
  getUser(@Param('id') id: string): Promise<UserInfo | null> {
    return this.userService.findRestaurantById(id);
  }

  @Get('place/:text')
  getPlaceDetails(@Param('text') placeText: string) {
    return this.restaurantService.getDetailsFromGoogle(placeText);
  }
}
