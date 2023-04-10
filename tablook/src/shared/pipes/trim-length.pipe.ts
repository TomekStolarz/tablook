import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'trimLength',
})
export class TrimLengthPipe implements PipeTransform {
	transform(value: string, length: number, ...args: unknown[]): unknown {
		return value.slice(0, length);
	}
}
