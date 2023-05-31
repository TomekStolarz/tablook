import { Component, Input } from '@angular/core';
import { TableResult } from 'src/home/search-module/interfaces/table-result.interface';

@Component({
	selector: 'app-free-table',
	templateUrl: './free-table.component.html',
})
export class FreeTableComponent {
	@Input()
	freeTableDate!: TableResult;
}
