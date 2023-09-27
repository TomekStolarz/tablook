import { BookingTime } from './booking-time.interface';
import { ConfirmationStatus } from './confirmatiom-status.enum';

export interface OrderDTO {
  userId: string;
  restaurantId: string;
  date: Date;
  time: BookingTime;
  tableId: string;
  tableSize: number;
  confirmation: ConfirmationStatus;
}
