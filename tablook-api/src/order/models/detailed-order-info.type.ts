import { Address } from 'src/user/models/address.interface';
import { OrderInfo } from './order-info.interface';

export type DetailedOrderInfo = {
  name: string;
  phone: string;
  address?: Address;
} & OrderInfo;
