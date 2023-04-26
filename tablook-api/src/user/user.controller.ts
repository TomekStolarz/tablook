import { Controller, Get, Param, Delete, Body, Put } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UserInfo } from './models/user-info.interface';
import { UserService } from './user.service';
import { NewUserDTO } from './dtos/new-user.dto';
import { AdminCurrentUserGuard } from 'src/auth/guards/admin-user.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @UseGuards(JwtGuard, AdminCurrentUserGuard)
  getUser(@Param('id') id: string): Promise<UserInfo | null> {
    return this.userService.findById(id);
  }

  @Put(':id')
  @UseGuards(JwtGuard, AdminCurrentUserGuard)
  updateUser(
    @Param('id') id: string,
    @Body() userData: Partial<NewUserDTO>,
  ): Promise<UserInfo | null> {
    return this.userService.updateUser(id, userData);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, AdminCurrentUserGuard)
  deleteUser(@Param('id') id: string): Promise<string> {
    return this.userService.deleteUser(id);
  }
}
