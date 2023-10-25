import { Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { RestaurantSearchInfo } from '../../interfaces/restaurant-search-info.interface';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SearchService } from '../../services/search.service';
import { Alignment } from 'src/filters-module/models/alignment.enum';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/store/user.selector';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
})
export class SearchComponent implements OnInit, OnDestroy {
	
	@ViewChild('resultDiv')
	resultDiv?: ElementRef;

    onResultScroll(result: HTMLDivElement) {
		this.goToTopVisible = result.scrollTop > 20;
    }

	protected goToTopVisible = false;

	private readonly searchService = inject(SearchService);
	
	private readonly store = inject(Store);
	
	private readonly responsive = inject(BreakpointObserver);

	searchResults$!: BehaviorSubject<RestaurantSearchInfo[]>;
	verticalAlign: Alignment = Alignment.VERTICAL;
	private subscriptions: Subscription[] = [];
	user?: UserInfo;
	user$ = this.store.select(selectUser);
	isSearching = true;
	isMobile = false;

	ngOnInit(): void {
		this.searchResults$ = this.searchService.searchResults$;
		const userSub = this.user$.subscribe((user) => {
			this.user = user;
		});
		const searchSub = this.searchService.isSearching$.subscribe(
			(x) => (this.isSearching = x)
		);
		this.subscriptions.push(userSub);
		this.subscriptions.push(searchSub);

		const respSub = this.responsive.observe([Breakpoints.TabletPortrait, Breakpoints.HandsetPortrait])
			.subscribe((result) => {
				if (result.matches) {
					this.isMobile = true;
				} else {
					this.isMobile = false;
				}
			});
			
		this.subscriptions.push(respSub);
	}

	protected goToTop() {
		this.resultDiv?.nativeElement.scroll({
			top: 0,
			left: 0,
			behavior: "smooth",
		});
	}

	ngOnDestroy(): void {
		this.subscriptions.forEach((sub) => sub.unsubscribe());
	}
}
