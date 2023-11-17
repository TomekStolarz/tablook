import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  HttpException,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UserService } from 'src/user/user.service';
import { emailData } from 'email.data';
import { ContactRequest } from '../models/contact-request.type';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(
    private readonly mailService: MailService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtGuard)
  async sendContactEmail(@Body() mailData: ContactRequest) {
    const user = await this.userService.findById(mailData.userId);
    if (!user) {
      throw new HttpException('Bad user id provided', HttpStatus.BAD_REQUEST);
    }
    this.mailService.sendEmail({
      sender: emailData.email,
      receiver: emailData.email,
      subject: mailData.subject,
      template: './contact',
      templateContext: {
        sender: user.email,
        message: mailData.message,
        topic: mailData.subject,
      },
    });
    return true;
  }
}
