import { BookingTime } from "src/home/search-module/interfaces/booking-time.interface";

export interface Order {
  userId: string;
  restaurantId: string;
  date: Date;
  time: BookingTime;
  tableId: string;
  tableSize: number;
}
