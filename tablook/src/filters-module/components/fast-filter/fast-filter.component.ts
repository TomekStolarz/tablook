import { Component, Input } from '@angular/core';
import { FastFilter } from 'src/filters-module/models/fast-filter.interface';
import { SearchService } from 'src/home/search-module/services/search.service';

@Component({
	selector: 'app-fast-filter',
	templateUrl: './fast-filter.component.html',
})
export class FastFilterComponent {
	@Input()
	filterData!: FastFilter;

	constructor(private searchService: SearchService) {}

	showFilterResulst() {
		this.searchService.filterResults(this.filterData?.filterKey);
	}
}
