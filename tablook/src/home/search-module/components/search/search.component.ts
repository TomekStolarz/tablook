import { Component, OnDestroy, OnInit } from '@angular/core';
import { RestaurantSearchInfo } from '../../interfaces/restaurant-search-info.interface';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { Alignment } from 'src/filters-module/models/alignment.enum';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/store/user.selector';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit, OnDestroy {
	searchResults$!: BehaviorSubject<RestaurantSearchInfo[]>;
	verticalAlign: Alignment = Alignment.VERTICAL;
	private subscriptions: Subscription[] = [];
	user?: UserInfo;
	user$ = this.store.select(selectUser);

	constructor(private searchService: SearchService, private store: Store) {}

	ngOnInit(): void {
		this.searchResults$ = this.searchService.searchResults$;
		const userSub = this.user$.subscribe((user) => {
			this.user = user;
		});
		this.subscriptions.push(userSub);
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((sub) => sub.unsubscribe());
	}
}
