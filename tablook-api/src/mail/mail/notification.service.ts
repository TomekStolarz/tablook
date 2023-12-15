import { Injectable } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfirmationStatus } from 'src/order/models/confirmatiom-status.enum';
import { UserService } from 'src/user/user.service';
import { emailData } from '../../../email.data';
import { UserInfo } from 'src/user/models/user-info.interface';
import { config } from 'src/dev.config';
import { OrderInfo } from 'src/order/models/order-info.interface';

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
    const receiver = emailData.email; //user.email;
    this.mailService.sendEmail({
      sender: emailData.email,
      receiver: receiver,
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
        name: user.name[0].toUpperCase() + user.name.slice(1),
        date: date.toDateString(),
      },
    });
  }

  async sendNewOrder(restaurant: UserInfo) {
    const receiver = emailData.email; //restaurant.email;
    this.mailService.sendEmail({
      sender: emailData.email,
      receiver: receiver,
      subject: 'You have new order!',
      template: 'new-order',
      templateContext: {
        name: restaurant.name,
        panelLink: `${config.front}/home/restaurant-account/reservations`,
        panel: 'panel',
      },
    });
  }

  async sendFinishOrder(restaurant: UserInfo, user: UserInfo) {
    const receiver = emailData.email; //user.email;
    this.mailService.sendEmail({
      sender: emailData.email,
      receiver: receiver,
      subject: 'Make review about your visit!',
      template: 'leave-opinion',
      templateContext: {
        place: restaurant.name,
        name: `${user.name[0].toUpperCase()}${user.name.slice(1)}`,
        googleLink: restaurant.details.googleMapsLink,
        reviewText: 'Add review ⭐',
      },
    });
  }

  async sendOrderNotification(
    restaurant: UserInfo,
    user: UserInfo,
    order: OrderInfo,
  ) {
    const receiver = emailData.email; //user.email;
    this.mailService.sendEmail({
      sender: emailData.email,
      receiver: receiver,
      subject: 'Reservation reminder',
      template: 'reservation-reminder',
      templateContext: {
        place: restaurant.name,
        name: `${user.name[0].toUpperCase()}${user.name.slice(1)}`,
        order: order,
      },
    });
  }
}
