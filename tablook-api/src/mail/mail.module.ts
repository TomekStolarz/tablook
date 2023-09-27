import { Module } from '@nestjs/common';
import { MailController } from './mail/mail.controller';
import { UserModule } from 'src/user/user.module';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
  controllers: [MailController],
  imports: [UserModule],
  providers: [AuthService, JwtService],
})
export class MailModule {}
