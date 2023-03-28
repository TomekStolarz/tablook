import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, MongooseError } from 'mongoose';
import { UserDetails } from './models/user-details.interface';
import { UserType } from './models/user-type.enum';
import { UserDocument } from './models/user.schema';
import * as bcrypt from 'bcrypt';
import { UserInfo } from './models/user-info.interface';

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
      name: user.name,
      surname: user.surname,
      phone: user.phone,
      type: user.type,
      details: user.details,
      email: user.email,
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
      throw new HttpException('Forbidden', HttpStatus.BAD_REQUEST);
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

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserInfo | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return this.getUserInfo(user);
  }
}