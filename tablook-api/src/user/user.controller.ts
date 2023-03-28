import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UserDetails } from './models/user-details.interface';
import { UserInfo } from './models/user-info.interface';
import { UserType } from './models/user-type.enum';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: string): Promise<UserInfo | null> {
    return this.userService.findById(id);
  }
}
