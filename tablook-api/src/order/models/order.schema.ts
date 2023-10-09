import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { BookingTime } from './booking-time.interface';
import { ConfirmationStatus } from './confirmatiom-status.enum';

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

  @Prop({ required: true })
  confirmation: ConfirmationStatus;

  @Prop({ required: true })
  clientName: string;

  @Prop({ required: true })
  phone: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
