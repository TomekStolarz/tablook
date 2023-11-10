import { Injectable } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfirmationStatus } from 'src/order/models/confirmatiom-status.enum';
import { UserService } from 'src/user/user.service';
import { emailData } from 'email.data';
import { UserInfo } from 'src/user/models/user-info.interface';

@Injectable()
export class NotificationService {
  constructor(
    private readonly mailService: MailService,
    private readonly userService: UserService,
  ) {}

  async sendConfirmationStatusChange(
    confirmationStatus: ConfirmationStatus,
    userId: string,
    restaurant: UserInfo,
    date: Date,
  ) {
    const user = await this.userService.findById(userId);
    this.mailService.sendEmail({
      sender: emailData.email,
      receiver: user.email,
      subject: 'Confirmation status changed',
      template: 'confirmation',
      templateContext: {
        confirmed:
          confirmationStatus === ConfirmationStatus.CONFIRMED
            ? 'confirmed'
            : 'rejected',
        place: restaurant.name,
        phone: user.phone,
        email: user.email,
        confirmationStatus: confirmationStatus === ConfirmationStatus.CONFIRMED,
        name: user.name.slice(0).toUpperCase() + user.name.slice(1),
        date: date.toDateString(),
      },
    });
  }
}
