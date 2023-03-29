import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import * as randomToken from 'rand-token';
import * as moment from 'moment';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { UserInfo } from 'src/user/models/user-info.interface';
import { UserDTO } from 'src/user/dtos/user.dto';
import { JwtService } from '@nestjs/jwt/dist';

@Injectable()
export class AuthService {
  loggedOut: string[] = [];
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  async register(user: Readonly<NewUserDTO>): Promise<UserInfo | any> {
    const { email, name, type, surname, phone, password, details } = user;
    const userExist = await this.userService.findByEmail(email);

    if (userExist) {
      this.logger.warn('Email already taken cannot register');
      throw new HttpException('Email already taken', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await this.hashPassword(password);

    const newUser = await this.userService.create(
      name,
      email,
      hashedPassword,
      type,
      surname,
      phone,
      details,
    );
    return this.userService.getUserInfo(newUser);
  }

  async doesPasswordMatch(
    password: string,
    hasshedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(password, hasshedPassword);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserInfo | null> {
    const user = await this.userService.findByEmail(email);
    const ifUserExist = !!user;
    if (!ifUserExist) {
      this.logger.warn('Wrong email');
      throw new HttpException('Bad email or password', HttpStatus.BAD_REQUEST);
    }

    const doesPasswordMatch = await this.doesPasswordMatch(
      password,
      user.password,
    );

    if (!doesPasswordMatch) {
      this.logger.warn('Wrong password');
      throw new HttpException('Bad email or password', HttpStatus.BAD_REQUEST);
    }

    return this.userService.getUserInfo(user);
  }

  async login(userData: UserDTO): Promise<{ token: string } | null> {
    const { email, password } = userData;
    const user = await this.validateUser(email, password);

    const jwt = await this.jwtService.signAsync({ user });
    this.logger.log('User successfully logged in');
    return { token: jwt };
  }
}
