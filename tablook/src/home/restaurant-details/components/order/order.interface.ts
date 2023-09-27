import { BookingTime } from "src/home/search-module/interfaces/booking-time.interface";
import { ConfirmationStatus } from "./confirmatiom-status.enum";

export interface Order {
  userId: string;
  restaurantId: string;
  date: Date;
  time: BookingTime;
  tableId: string;
  tableSize: number;
  confirmation: ConfirmationStatus;
}
