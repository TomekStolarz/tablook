import { Address } from 'src/app/interfaces/address.interface';
import { OpeningHours } from 'src/register-restaurant/models/opening-hours.interface';
import { Table } from 'src/shared/interfaces/table.interface';

export interface UserDetails {
	address: Address;
	openingHours: OpeningHours[];
	images: string[];
	description: string;
	googleMapsLink: string;
	tags: string[];
	tables: Table[];
	tablesMap: string;
}
