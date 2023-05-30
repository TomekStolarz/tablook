import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { Alignment } from 'src/filters-module/models/alignment.enum';
import { Control } from 'src/filters-module/models/control.interface';

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
	};

	searchForm: FormGroup = this.fb.group({
		query: [''],
		size: [1, [Validators.required, Validators.min(1)]],
		location: [''],
		arrival: ['', [Validators.pattern(/\d\d:\d\d/)]],
		leave: ['', [Validators.pattern(/\d\d:\d\d/)]],
	});

	constructor(private fb: FormBuilder) {}

	ngOnInit(): void {
		if (this.isExchancedForm) {
			this.searchForm.addControl(
				'date',
				this.fb.control('', Validators.required)
			);
			this.searchForm.addControl('rating', this.fb.control(''));

			this.searchForm.valueChanges.pipe(
				distinctUntilChanged(),
				debounceTime(400)
			);
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
	}
}
