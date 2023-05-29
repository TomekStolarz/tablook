import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'tbDate',
})
export class TbDatePipe implements PipeTransform {
	constructor(private datePipe: DatePipe) {}

	transform(value: number): string {
		return (
			this.datePipe.transform(new Date(value * 1000), 'longDate') || ''
		);
	}
}
