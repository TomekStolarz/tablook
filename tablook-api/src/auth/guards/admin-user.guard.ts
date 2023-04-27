import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from 'src/user/user.service';
import { Request } from 'express';
import { UserType } from 'src/user/models/user-type.enum';

@Injectable()
export class AdminCurrentUserGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return await this.validateRequest(request);
  }

  async validateRequest(req: Request): Promise<boolean> {
    const userid = await this.authService.checkJwtExpiration(
      req?.cookies['auth-cookie']?.token,
    );
    const manipulationUserId = req.url.split('/').pop().split('?').shift();
    const user = await this.userService.findById(userid);
    return user.type === UserType.ADMIN || manipulationUserId === userid;
  }
}
