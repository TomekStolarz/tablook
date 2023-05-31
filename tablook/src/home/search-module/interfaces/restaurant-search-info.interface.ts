import { Address } from 'src/app/interfaces/address.interface';
import { Table } from 'src/shared/interfaces/table.interface';

export interface RestaurantSearchInfo {
	id: string;
	name: string;
	address: Address;
	phone: string;
	rating: number;
	totalOpinions: number;
	freeTables: number;
	tables: Table[];
	tags: string[];
	image: string;
	isFavourite?: boolean;
}
