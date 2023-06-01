import { Address } from 'src/app/interfaces/address.interface';
import { TableResult } from './table-result.interface';

export interface RestaurantSearchInfo {
	id: string;
	name: string;
	address: Address;
	phone: string;
	rating: number;
	totalOpinions: number;
	freeTables: number;
	tables: TableResult[];
	tags: string[];
	image: string;
	isFavourite?: boolean;
}
