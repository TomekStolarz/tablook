import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Subscription, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { selectUser } from 'src/app/store/user.selector';
import { Alignment } from 'src/filters-module/models/alignment.enum';
import { Control } from 'src/filters-module/models/control.interface';
import { SearchRequest } from 'src/home/search-module/interfaces/search-request.interface';
import { Sorting } from 'src/home/search-module/interfaces/sorting.model';
import { SearchService } from 'src/home/search-module/services/search.service';

@Component({
	selector: 'app-filters',
	templateUrl: './filters.component.html',
})
export class FiltersComponent implements OnInit, OnDestroy {
	@Input()
	alignment: Alignment = Alignment.HORIZONTAL;

	@Output()
	searchEvent: EventEmitter<void> = new EventEmitter();

	@Input()
	isExchancedForm = false;

	private readonly fb = inject(FormBuilder);
	
	private readonly searchService = inject(SearchService);

	private readonly store = inject(Store);
	
	controls: Control[] = [];
	labels: { [key: string]: string } = {
		query: 'Search query',
		rating: 'Min. rating',
		size: 'Table size',
	};
	types: { [key: string]: string } = {
		size: 'number',
		arrival: 'time',
		leave: 'time',
		date: 'date',
	};

	searchForm: FormGroup = this.fb.group({
		query: [''],
		size: [1, [Validators.required, Validators.min(1)]],
		location: [''],
		arrival: ['', [Validators.pattern(/\d\d:\d\d/)]],
		leave: ['', [Validators.pattern(/\d\d:\d\d/)]],
	});

	protected sortingData: Sorting[] = [
		{key: 'Total opinions', direction: -1},
		{key: 'Total opinions', direction: 1},
		{key: 'Rating', direction: -1},
		{key: 'Rating', direction: 1},
		{key: 'Free tables', direction: -1},
		{key: 'Free tables', direction: 1},
		{key: 'Restaurant name', direction: -1},
		{key: 'Restaurant name', direction: 1},
	]

	private subscription: Subscription[] = [];

	private userId?: string;

	ngOnInit(): void {
		if (this.isExchancedForm) {
			this.searchForm.addControl(
				'date',
				this.fb.control(new Date(), Validators.required)
			);
			this.searchForm.addControl('rating', this.fb.control(''));

			if (this.searchService.lastSearchedQuery) {
				Object.entries(this.searchService.lastSearchedQuery).forEach(
					([key, value]) => {
						if (value) {
							if (key === 'date') {
								value = new Date(value);
							}
							this.searchForm.get(key)?.setValue(value);
						}
					}
				);
			}
		}

		this.controls = Object.keys(this.searchForm.controls).map((key) => {
			return {
				name: key,
				label: this.labels[key] || key,
				type: this.types[key] || 'text',
				stretch: key === 'query',
				disablabed: key === 'leave',
			};
		});

		if (this.isExchancedForm) { 
			this.searchForm.addControl(
				'sortBy',
				this.fb.control('',)
			);
			
			this.subscription.push(
				this.searchForm.valueChanges
					.pipe(
						debounceTime(400),
						distinctUntilChanged())
					.subscribe(() => this.search()));
		}

		this.subscription.push(
			this.store.pipe(
				select(selectUser),
				map((user => user?.id))
			).subscribe((userId) => {
				this.userId = userId;
				if (userId) {
					this.sortingData.unshift({ key: 'Favourite', direction: -1 });
				}
			})
		)
	}

	search(): void {
		if (this.searchForm.invalid) {
			this.searchForm.markAllAsTouched();
			return;
		}

		const request = this.prepareFormValue();

		this.searchService.search(request);

		this.searchEvent.emit();
	}

	private prepareFormValue(): SearchRequest {
		const formData = this.searchForm.getRawValue();
		const request = {
			date: formData.date ?? new Date().toISOString(),
			size: parseInt(formData.size),
			arrival: formData.arrival.trim(),
			location: formData.location.trim(),
			query: formData.query.trim(),
			leave: formData.leave?.trim(),
			rating: formData.rating,
			sortBy: formData.sortBy,
			userId: this.userId,
			pageIndex: 1,
		};
		Object.entries(request).forEach(([key, value]) => {
			if (!value) {
				delete request[key as keyof typeof request];
			}
		});

		return request;
	}

	get sortBy() {
		return this.searchForm.controls['sortBy'].value;
	}

	ngOnDestroy(): void {
		this.subscription.forEach((sb) => sb.unsubscribe());
	}
}
