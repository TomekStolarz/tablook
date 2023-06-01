import { BookingTime } from "./booking-time.interface";

export interface FreeTable {
  tableId: string;
  available: BookingTime[];
}
