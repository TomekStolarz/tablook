import { Component, OnInit } from '@angular/core';
import { RestaurantSearchInfo } from '../../interfaces/restaurant-search-info.interface';
import { BehaviorSubject } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { Alignment } from 'src/filters-module/models/alignment.enum';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit {
	searchResults$!: BehaviorSubject<RestaurantSearchInfo[]>;
	verticalAlign: Alignment = Alignment.VERTICAL;

	constructor(private searchService: SearchService) {}

	ngOnInit(): void {
		this.searchResults$ = this.searchService.searchResults$;
	}
}
