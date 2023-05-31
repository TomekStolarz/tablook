import { BookingTime } from 'src/order/models/booking-time.interface';

export interface FreeTable {
  tableId: string;
  available: BookingTime[];
}
