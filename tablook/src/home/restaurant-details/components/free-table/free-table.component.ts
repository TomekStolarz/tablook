import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TableResult } from 'src/home/search-module/interfaces/table-result.interface';
import { SharedModule } from 'src/shared/shared.module';

@Component({
	selector: 'app-free-table',
	templateUrl: './free-table.component.html',
	standalone: true,
	imports: [
		SharedModule,
		CommonModule
	]
})
export class FreeTableComponent {
	@Input()
	freeTableDate!: TableResult;
}
