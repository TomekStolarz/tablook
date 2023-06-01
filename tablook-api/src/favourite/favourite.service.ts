import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { FavouriteResponse } from './models/favourite-response.interface';
import { Favourite } from './models/favourite.interface';
import { UserType } from 'src/user/models/user-type.enum';

@Injectable()
export class FavouriteService {
  constructor(private userService: UserService) {}
  private logger = new Logger(FavouriteService.name);

  async getAllFavourites(userId: string): Promise<FavouriteResponse> {
    const userDetails = await this.userService.findById(userId);
    if (!userDetails)
      throw new HttpException('Cannot find user', HttpStatus.BAD_REQUEST);
    this.logger.log(`Success on get favs for user ${userId}`);
    const resp = { favourite: [...userDetails.favourites] };
    return resp;
  }

  async addToFavourite(favourite: Favourite): Promise<{ message: string }> {
    const userData = await this.userService.findById(favourite.userId);
    const restaurant = await this.userService.findById(favourite.favourite);
    if (!userData)
      throw new HttpException('Cannot find user', HttpStatus.BAD_REQUEST);

    if (!restaurant)
      throw new HttpException('Cannot find restaurant', HttpStatus.BAD_REQUEST);

    if (restaurant.type !== UserType.RESTAURANT)
      throw new HttpException('This is not restaurant', HttpStatus.BAD_REQUEST);

    if (userData.favourites.includes(favourite.favourite))
      throw new HttpException(
        'User have this restaurant in favourites already',
        HttpStatus.NOT_ACCEPTABLE,
      );

    const favourites = userData.favourites
      ? [...userData.favourites, favourite.favourite]
      : [favourite.favourite];

    await this.userService.updateUser(favourite.userId, {
      favourites: favourites,
    });
    this.logger.log(`Successfully added restaurant to favourites`);
    return { message: 'Successfully added restaurant to favourites' };
  }

  async removeFromFavourite(
    favourite: Favourite,
  ): Promise<{ message: string }> {
    const userData = await this.userService.findById(favourite.userId);

    if (!userData)
      throw new HttpException('Cannot find user', HttpStatus.BAD_REQUEST);

    if (!userData.favourites || !userData.favourites.length)
      throw new HttpException(
        'User dont have any favourites',
        HttpStatus.NOT_FOUND,
      );

    if (!userData.favourites.includes(favourite.favourite))
      throw new HttpException(
        'User dont have this restaurant in favourites',
        HttpStatus.NOT_FOUND,
      );

    const newFavourites = [
      ...userData.favourites?.filter((fav) => fav !== favourite.favourite),
    ];

    await this.userService.updateUser(favourite.userId, {
      favourites: newFavourites,
    });
    this.logger.log(`Successfully deleted restaurant from favourites`);
    return { message: 'Successfully deleted restaurant from favourites' };
  }

  async isRestaurantFavourite(
    userId: string,
    restaurantId: string,
  ): Promise<{ isFavourite: boolean }> {
    const userDetails = await this.userService.findById(userId);
    if (!userDetails)
      throw new HttpException('Cannot find user', HttpStatus.BAD_REQUEST);
    const resp = {
      isFavourite: !!userDetails.favourites.find((e) => e === restaurantId),
    };
    return resp;
  }
}
