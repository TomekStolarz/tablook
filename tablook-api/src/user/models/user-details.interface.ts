import { Address } from './address.interface';
import { OpeningHour } from './opening-hour.interface';
import { Table } from './table.interface';

export class UserDetails {
  address: Address;
  openingHours: OpeningHour[];
  images: string[];
  description: string;
  googleMapsLink: string;
  tags: string[];
  tables: Table[];
  tablesMap: string;
}
