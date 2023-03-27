import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDetails } from './models/user-details.interface';
import { UserType } from './models/user-type.enum';
import { UserDocument } from './models/user.schema';
import * as bcrypt from 'bcrypt';

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

  create(
    name: string,
    email: string,
    password: string,
    type: UserType,
    surname?: string,
    phone?: string,
    details?: UserDetails,
  ) {
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
  ) {
    try {
      const hash = await bcrypt.hash(password, 10);
      const newUser = new this.userModel({
        name,
        email,
        password: hash,
        type,
        surname,
        phone,
      });
      this.logger.log('User successfully created!');
    } catch (error: Error) {
        this.logger.log('User successfully created!');
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
  ) {}
}
