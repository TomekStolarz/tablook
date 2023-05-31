import { Table } from 'src/shared/interfaces/table.interface';
import { BookingTime } from './booking-time.interface';

export interface TableResult extends Table {
	available: BookingTime[];
}
