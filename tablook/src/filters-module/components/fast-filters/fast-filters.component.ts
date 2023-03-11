import { Component, Input } from '@angular/core';
import { FastFilter } from 'src/filters-module/models/fast-filter.interface';
import { FiltersService } from 'src/filters-module/services/filters.service';

@Component({
	selector: 'app-fast-filters',
	templateUrl: './fast-filters.component.html',
	styleUrls: ['./fast-filters.component.scss'],
})
export class FastFiltersComponent {
	@Input()
	filterData!: FastFilter;

	constructor(private filterService: FiltersService) {}

	showFilterResulst() {
		this.filterService.filterResults(this.filterData?.filterKey);
	}
}
