import { Address } from 'src/user/models/address.interface';
import { OrderInfo } from './order-info.interface';

export type DetailedOrderInfo = {
  address?: Address;
  finished: boolean;
} & OrderInfo;
