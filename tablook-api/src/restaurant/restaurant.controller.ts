import { Controller, Param, Get } from '@nestjs/common';
import { UserInfo } from 'src/user/models/user-info.interface';
import { UserService } from 'src/user/user.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  getUser(@Param('id') id: string): Promise<UserInfo | null> {
    return this.userService.findRestaurantById(id);
  }
}
