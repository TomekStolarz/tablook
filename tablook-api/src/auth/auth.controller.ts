import { Body, Controller, Post } from '@nestjs/common';
import { Get, HttpCode, Res } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { UserDTO } from 'src/user/dtos/user.dto';
import { UserDetails } from 'src/user/models/user-details.interface';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { UserService } from 'src/user/user.service';
import { UserInfo } from 'src/user/models/user-info.interface';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() user: NewUserDTO): Promise<UserDetails | null> {
    return this.authService.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() user: UserDTO,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserInfo | null> {
    const token = await this.authService.login(user);

    const secureData = {
      token,
    };
    res.cookie('auth-cookie', secureData, { httpOnly: true });
    return this.userService
      .findByEmail(user.email)
      .then((user) => this.userService.findById(user.id));
  }
}
