import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { AdminCurrentUserGuard } from 'src/auth/guards/admin-user.guard';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { MailData } from '../mail.type';
import { MailerService } from '@nestjs-modules/mailer';
import { UserService } from 'src/user/user.service';
import { emailData } from 'email.data';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailerService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtGuard)
  async sendEmail(@Body() mailData: MailData) {
    const user = await this.userService.findById(mailData.userId);
    if (!user) {
      throw new HttpException('Bad user id provided', HttpStatus.BAD_REQUEST);
    }
    return this.mailService.sendMail({
      from: emailData.email,
      to: emailData.email,
      subject: mailData.subject,
      text: mailData.message,
      html: `Email from: <b>${user.email}</b>`,
    });
  }
}
