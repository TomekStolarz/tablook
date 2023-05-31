import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { FavouriteService } from './favourite.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { AdminCurrentUserGuard } from 'src/auth/guards/admin-user.guard';
import { FavouriteResponse } from './models/favourite-response.interface';
import { Favourite } from './models/favourite.interface';

@Controller('favourite')
export class FavouriteController {
  constructor(private favouriteService: FavouriteService) {}

  @Get(':id')
  @UseGuards(JwtGuard, AdminCurrentUserGuard)
  getUserFavouritesRestaurants(
    @Param('id') userId,
  ): Promise<FavouriteResponse> {
    return this.favouriteService.getAllFavourites(userId);
  }

  @Post(':id')
  @UseGuards(JwtGuard, AdminCurrentUserGuard)
  isRestaurantFavourite(
    @Param('id') userId,
    @Body() restaurantId: { restaurantId: string },
  ): Promise<{ isFavourite: boolean }> {
    return this.favouriteService.isRestaurantFavourite(
      userId,
      restaurantId.restaurantId,
    );
  }

  @Post()
  @UseGuards(JwtGuard)
  addFavouriteRestaurant(
    @Body() favourite: Favourite,
  ): Promise<{ message: string }> {
    return this.favouriteService.addToFavourite(favourite);
  }

  @Delete()
  @UseGuards(JwtGuard)
  removeFavouriteRestaurant(
    @Body() favourite: Favourite,
  ): Promise<{ message: string }> {
    return this.favouriteService.removeFromFavourite(favourite);
  }
}
