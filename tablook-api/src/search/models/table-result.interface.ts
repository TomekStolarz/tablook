import { BookingTime } from 'src/order/models/booking-time.interface';
import { Table } from 'src/user/models/table.interface';

export interface TableResult extends Table {
  available: BookingTime[];
}
