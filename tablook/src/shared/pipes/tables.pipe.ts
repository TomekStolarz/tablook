import { Pipe, PipeTransform } from '@angular/core';
import { Table } from '../interfaces/table.interface';

@Pipe({
	name: 'tables',
})
export class TablesPipe implements PipeTransform {
	transform(tables: string): string {
		if (!tables) return '';

		const _tables = JSON.parse(tables);
		if (_tables) {
			return [..._tables]
				.map((elem) => `Table: id= ${elem.id}, seats= ${elem.seats}`)
				.join(', ');
		}
		return '';
	}
}
