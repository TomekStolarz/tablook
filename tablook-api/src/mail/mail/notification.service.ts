import { Injectable } from '@nestjs/common';
import { MailService } from './mail.service';
import { ConfirmationStatus } from 'src/order/models/confirmatiom-status.enum';
import { UserService } from 'src/user/user.service';
import { emailData } from 'email.data';
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
        icon: this.getConfirmationIcon(
          confirmationStatus === ConfirmationStatus.CONFIRMED,
        ),
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
        style: `padding: 5px;
        border-radius: 10px;
        background-color: #0e8d7e;
        color: white;`,
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
        name: `${user.name[0].toUpperCase}${user.name.slice(1)}`,
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
        name: `${user.name[0].toUpperCase}${user.name.slice(1)}`,
        order: order,
      },
    });
  }

  private getConfirmationIcon(confirmatiom: boolean) {
    return confirmatiom
      ? `<svg xmlns="http://www.w3.org/2000/svg" fill="#00b337" height="24" viewBox="0 -960 960 960" width="24"><path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" fill="rgba(255, 51, 51, 0.88888)" height="24" viewBox="0 -960 960 960" width="24"><path d="m336-280 144-144 144 144 56-56-144-144 144-144-56-56-144 144-144-144-56 56 144 144-144 144 56 56ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/></svg>`;
  }
}
