import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FastFilter } from 'src/filters-module/models/fast-filter.interface';
import { FiltersService } from 'src/filters-module/services/filters.service';

@Component({
	selector: 'app-fast-filters',
	templateUrl: './fast-filters.component.html',
	styleUrls: ['./fast-filters.component.scss'],
})
export class FastFiltersComponent implements OnInit {
	filtersData$!: Observable<FastFilter[]>;

	constructor(private filtersService: FiltersService) {}

	ngOnInit(): void {
		this.filtersData$ = this.filtersService.getFastFilters();
	}
}
