import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDetails } from './models/user-details.interface';
import { UserType } from './models/user-type.enum';
import { UserDocument } from './models/user.schema';
import { UserInfo } from './models/user-info.interface';
import { NewUserDTO } from './dtos/new-user.dto';

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
}
