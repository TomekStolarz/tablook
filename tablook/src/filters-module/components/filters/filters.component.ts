import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { Alignment } from 'src/filters-module/models/alignment.enum';
import { Control } from 'src/filters-module/models/control.interface';
import { SearchRequest } from 'src/home/search-module/interfaces/search-request.interface';
import { SearchService } from 'src/home/search-module/services/search.service';

@Component({
	selector: 'app-filters',
	templateUrl: './filters.component.html',
})
export class FiltersComponent implements OnInit {
	@Input()
	alignment: Alignment = Alignment.HORIZONTAL;

	@Output()
	searchEvent: EventEmitter<void> = new EventEmitter();

	@Input()
	isExchancedForm = false;

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

	constructor(
		private fb: FormBuilder,
		private searchService: SearchService
	) {}

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

			this.searchForm.valueChanges
				.pipe(debounceTime(400), distinctUntilChanged())
				.subscribe(() => this.search());
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
		};
		Object.entries(request).forEach(([key, value]) => {
			if (!value) {
				delete request[key as keyof typeof request];
			}
		});

		return request;
	}
}
