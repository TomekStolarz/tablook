import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserDetails } from './user-details.interface';
import { UserType } from './user-type.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: false })
  surname?: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: false })
  phone?: string;

  @Prop({ required: false })
  password: string;

  @Prop({ required: true })
  type: UserType;

  @Prop({ type: UserDetails, required: false })
  details?: UserDetails;
}

export const UserSchema = SchemaFactory.createForClass(User);
