import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { emailData } from '../../../email.data';
import { MailData } from '../models/mail.type';

@Injectable()
export class MailService {
  constructor(private readonly mailService: MailerService) {}

  async sendEmail(mailData: MailData) {
    try {
      return this.mailService
        .sendMail({
          from: emailData.email,
          to: mailData.receiver,
          subject: mailData.subject,
          text: mailData.message,
          template: mailData.template,
          context: mailData.templateContext,
        })
        .catch((error) => {
          console.error(error);
          return true;
        });
    } catch {
      return true;
    }
  }
}
