import { Component, Input } from '@angular/core';
import { FastFilter } from 'src/filters-module/models/fast-filter.interface';
import { FiltersService } from 'src/filters-module/services/filters.service';

@Component({
	selector: 'app-fast-filter',
	templateUrl: './fast-filter.component.html',
})
export class FastFilterComponent {
	@Input()
	filterData!: FastFilter;

	constructor(private filterService: FiltersService) {}

	showFilterResulst() {
		this.filterService.filterResults(this.filterData?.filterKey);
	}
}
