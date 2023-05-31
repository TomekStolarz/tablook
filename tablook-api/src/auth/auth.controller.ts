import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { Get, HttpCode, Req, Res } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { UserDTO } from 'src/user/dtos/user.dto';
import { UserDetails } from 'src/user/models/user-details.interface';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
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
    const secureData = { ...token };
    res.cookie('auth-cookie', secureData, { httpOnly: true });
    return this.userService
      .findByEmail(user.email)
      .then((user) => this.userService.findById(user.id));
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async isAuth(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<UserInfo | null> {
    if (!req?.cookies['auth-cookie']) {
      return null;
    }
    let userid = null;
    try {
      userid = await this.authService.checkJwtExpiration(
        req?.cookies['auth-cookie']?.token,
      );
    } catch (ex: any) {
      res.clearCookie('auth-cookie');
      throw new UnauthorizedException();
    }

    if (!userid) {
      return null;
    }
    return this.userService.findById(userid);
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('auth-cookie');
  }
}
