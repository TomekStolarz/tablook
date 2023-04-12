import { Controller, Get, Param } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UserInfo } from './models/user-info.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @UseGuards(JwtGuard)
  getUser(@Param('id') id: string): Promise<UserInfo | null> {
    return this.userService.findById(id);
  }
}
