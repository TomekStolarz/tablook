import { BookingTime } from './booking-time.interface';

export interface OrderInfo {
  orderId: string;
  userId: string;
  restaurantId: string;
  date: Date;
  time: BookingTime;
  tableId: string;
  tableSize: number;
}
