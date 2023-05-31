import { Pipe, PipeTransform } from '@angular/core';
import { Address } from 'src/app/interfaces/address.interface';

@Pipe({
	name: 'addressFormat',
})
export class AddressFormatPipe implements PipeTransform {
	transform(value: Address): string {
		return `Address: ${value.street} ${value.flat}, ${value.city}, ${value.country}`;
	}
}
