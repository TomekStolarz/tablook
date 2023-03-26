import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'phonePrefix',
})
export class PhonePrefixPipe implements PipeTransform {
	transform(value: string): string {
		return value.charAt(0) === '+' ? value : `+${value}`;
	}
}
