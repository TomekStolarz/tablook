import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BookingTime } from './booking-time.interface';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  restaurantId: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ type: BookingTime, required: true })
  time: BookingTime;

  @Prop({ required: true })
  tableId: string;

  @Prop({ required: true })
  tableSize: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
