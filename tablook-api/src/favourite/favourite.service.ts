import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { FavouriteResponse } from './models/favourite-response.interface';
import { Favourite } from './models/favourite.interface';
import { UserType } from 'src/user/models/user-type.enum';

@Injectable()
export class FavouriteService {
  constructor(private userService: UserService) {}

  async getAllFavourites(userId: any): Promise<FavouriteResponse> {
    const userDetails = await this.userService.findById(userId);
    if (!userDetails)
      throw new HttpException('Cannot find user', HttpStatus.BAD_REQUEST);
    return { favourite: userDetails.favourites };
  }

  async addToFavourite(favourite: Favourite): Promise<string> {
    const userData = await this.userService.findById(favourite.userId);
    const restaurant = await this.userService.findById(favourite.favourite);
    if (!userData)
      throw new HttpException('Cannot find user', HttpStatus.BAD_REQUEST);

    if (!restaurant)
      throw new HttpException('Cannot find restaurant', HttpStatus.BAD_REQUEST);

    if (restaurant.type !== UserType.RESTAURANT)
      throw new HttpException('This is not restaurant', HttpStatus.BAD_REQUEST);

    const favourites = [...userData.favourites, favourite.favourite];

    const user = await this.userService.updateUser(favourite.userId, {
      favourites: favourites,
    });
    return 'Successfully added restaurant to favourites';
  }

  async removeFromFavourite(favourite: Favourite): Promise<string> {
    const userData = await this.userService.findById(favourite.userId);

    if (!userData)
      throw new HttpException('Cannot find user', HttpStatus.BAD_REQUEST);

    const newFavourites = [
      ...userData.favourites.filter((fav) => fav !== favourite.favourite),
    ];

    const user = await this.userService.updateUser(favourite.userId, {
      favourites: newFavourites,
    });
    return 'Successfully added restaurant to favourites';
  }
}
