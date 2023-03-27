import { Body, Controller, Post } from '@nestjs/common';
import { UserDetails } from './models/user-details.interface';
import { UserType } from './models/user-type.enum';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createUser(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
    @Body('type') type: UserType,
    @Body('surname') surname?: string,
    @Body('phone') phone?: string,
    @Body('details') details?: UserDetails,
  ) {
    return this.userService.create(
      name,
      email,
      password,
      type,
      surname,
      phone,
      details,
    );
  }
}
