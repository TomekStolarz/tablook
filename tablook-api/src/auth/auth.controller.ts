import { Body, Controller, Post } from '@nestjs/common';
import { HttpCode } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { NewUserDTO } from 'src/user/dtos/new-user.dto';
import { UserDTO } from 'src/user/dtos/user.dto';
import { UserDetails } from 'src/user/models/user-details.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  createUser(@Body() user: NewUserDTO): Promise<UserDetails | null> {
    return this.authService.register(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  login(@Body() user: UserDTO): Promise<{ token: string } | null> {
    return this.authService.login(user);
  }
}
