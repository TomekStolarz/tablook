import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform, inject } from '@angular/core';

@Pipe({
	name: 'tbDate',
})
export class TbDatePipe implements PipeTransform {
	private readonly datePipe = inject(DatePipe);

	transform(value: number): string {
		return (
			this.datePipe.transform(new Date(value * 1000), 'longDate') || ''
		);
	}
}
