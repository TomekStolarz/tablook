import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FastFilter } from 'src/filters-module/models/fast-filter.interface';
import { SearchService } from 'src/home/search-module/services/search.service';

@Component({
	selector: 'app-fast-filter',
	templateUrl: './fast-filter.component.html',
})
export class FastFilterComponent {
	@Input()
	filterData!: FastFilter;

	constructor(private searchService: SearchService,private router: Router) {}

	showFilterResulst() {
		this.searchService.filterResults(this.filterData?.filterKey);
		this.router.navigate(['/home/search']);
	}
}
