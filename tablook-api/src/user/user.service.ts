import {
  ForbiddenException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDetails } from './models/user-details.interface';
import { UserType } from './models/user-type.enum';
import { UserDocument } from './models/user.schema';
import { UserInfo } from './models/user-info.interface';
import { NewUserDTO } from './dtos/new-user.dto';
import { calculateArrivalandLeaving } from 'src/utils';
import { RestaurantFind } from 'src/search/models/restaurant-find.model';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  // eslint-disable-next-line @typescript-eslint/ban-types
  private creationMethods: { [key: string]: Function } = {
    [UserType.CUSTOMER]: this.createCustomer.bind(this),
    [UserType.RESTAURANT]: this.createRestaurant.bind(this),
  };

  getUserInfo(user: UserDocument): UserInfo {
    return {
      id: user.id,
      name: user.name,
      surname: user.surname,
      phone: user.phone,
      type: user.type,
      details: user.details,
      email: user.email,
      favourites: user.favourites,
    };
  }

  create(
    name: string,
    email: string,
    password: string,
    type: UserType,
    surname?: string,
    phone?: string,
    details?: UserDetails,
  ) {
    if (!this.creationMethods[type]) return;
    return this.creationMethods[type](
      name,
      email,
      password,
      type,
      surname,
      phone,
      details,
    );
  }

  private async createCustomer(
    name: string,
    email: string,
    password: string,
    type: UserType,
    surname?: string,
    phone?: string,
  ): Promise<UserDocument> {
    let newUser;
    try {
      newUser = new this.userModel({
        name,
        email,
        password,
        type,
        surname,
        phone,
      });
      this.logger.log('User successfully created!');
    } catch (error: any) {
      this.logger.error(error.message);
      throw new HttpException('Bad data', HttpStatus.BAD_REQUEST);
    }
    return newUser.save();
  }

  private createRestaurant(
    name: string,
    email: string,
    password: string,
    type: UserType,
    surname?: string,
    phone?: string,
    details?: UserDetails,
  ) {
    let newUser;
    try {
      newUser = new this.userModel({
        name,
        email,
        password,
        type,
        surname,
        phone,
        details,
      });
      this.logger.log('Restaurant successfully created!');
    } catch (error: any) {
      this.logger.error(error.message);
      throw new HttpException('Bad data', HttpStatus.BAD_REQUEST);
    }
    return newUser.save();
  }

  async updateUser(
    id: string,
    userData: Partial<NewUserDTO>,
  ): Promise<UserInfo | null> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) return null;
      const updatedUser = await this.userModel
        .findByIdAndUpdate(id, userData)
        .exec();
      this.logger.log('User successfully updated');
      return this.getUserInfo(updatedUser);
    } catch (error: any) {
      throw new HttpException('Bad id provided', HttpStatus.BAD_REQUEST);
    }
  }

  async deleteUser(id: string): Promise<string> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) return null;
      const deletedUser = await this.userModel.findByIdAndDelete(id).exec();
      this.logger.log('User successfully deleted');
      return deletedUser ? 'User successfully deleted' : 'Cannot delete user';
    } catch (error: any) {
      throw new HttpException('Bad id provided', HttpStatus.BAD_REQUEST);
    }
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserInfo | null> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) return null;
      return this.getUserInfo(user);
    } catch (error: any) {
      throw new HttpException('Bad id provided', HttpStatus.BAD_REQUEST);
    }
  }

  async findRestaurantById(id: string): Promise<UserInfo | null> {
    try {
      const user = await this.userModel.findById(id).exec();
      if (!user) return null;
      if (user.type !== UserType.RESTAURANT) {
        throw new ForbiddenException("You don't have access to this data");
      }
      return this.getUserInfo(user);
    } catch (error: any) {
      throw new HttpException('Bad id provided', HttpStatus.BAD_REQUEST);
    }
  }

  async findRestaurants(
    tableSize: number,
    date: string,
    arrivalTime: string,
    leaveTime?: string,
    query?: string,
    location?: string,
  ): Promise<RestaurantFind[]> {
    let queryRegex = new RegExp('.*'),
      locationRegex = new RegExp('.*');
    if (query) {
      queryRegex = new RegExp(query.trim(), 'i');
    }
    if (location) {
      locationRegex = new RegExp(location.trim(), 'i');
    }

    const size = parseInt(new Number(tableSize).toString());

    const matchedRestaurants = await this.userModel
      .find({
        type: UserType.RESTAURANT,
        $or: [
          { name: { $regex: queryRegex } },
          { 'details.tags': { $regex: queryRegex } },
        ],
        'details.tables.seats': { $gte: size },
        'details.address.city': { $regex: locationRegex },
      })
      .exec();

    const { arrival, leaving, dateEnd, dateStart, currentTime, futureDate } =
      calculateArrivalandLeaving(date, arrivalTime, leaveTime);

    const day = new Date(dateStart).toLocaleDateString('en-US', {
      weekday: 'long',
    });

    if (arrival < currentTime.getTime()) {
      return [];
    }

    if (leaveTime && leaving < currentTime.getTime()) {
      return [];
    }

    return matchedRestaurants
      .map((rest) => this.getUserInfo(rest))
      .filter((restaurant) => {
        const dayHours = restaurant.details.openingHours.find(
          (d) => d.day.toLowerCase() === day.toLowerCase(),
        );
        if (!dayHours) {
          return false;
        }

        if (futureDate && !arrivalTime) {
          return true;
        }
        const hours = dayHours.hours.split(/[:-]/).map((x) => parseInt(x));
        const opening = new Date(dateStart).setHours(hours[0], hours[1]);
        const closing = new Date(dateStart).setHours(hours[2], hours[3]);
        const closeCondition = leaving ? closing >= leaving : true;
        return opening <= arrival && arrival < closing && closeCondition;
      })
      .map((restaurant) => {
        const dayHours = restaurant.details.openingHours.find(
          (d) => d.day.toLowerCase() === day.toLowerCase(),
        );
        return { ...restaurant, todayHours: dayHours };
      });
  }
}
