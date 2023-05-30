import { Address } from 'src/user/models/address.interface';

export interface RestaurantSearchInfo {
  id: string;
  name: string;
  address: Address;
  phone: string;
  rating: number;
  totalOpinions: number;
  freeTables: number;
  tags: string[];
  image: string;
}
