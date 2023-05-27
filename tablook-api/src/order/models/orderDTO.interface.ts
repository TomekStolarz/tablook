import { BookingTime } from './booking-time.interface';

export interface OrderDTO {
  userId: string;
  restaurantId: string;
  date: Date;
  time: BookingTime;
  tableId: string;
  tableSize: number;
}
