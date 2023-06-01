import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { SearchService } from 'src/home/search-module/services/search.service';
import { SearchRequest } from 'src/home/search-module/interfaces/search-request.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Control } from 'src/filters-module/models/control.interface';
import { RestaurantInfo } from 'src/app/interfaces/restaurant-info.interface';

@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit {
	@Input()
	restaurant!: RestaurantInfo;

	searchRequest?: SearchRequest;

	controls: Control[] = [];
	labels: { [key: string]: string } = {
		size: 'Table size',
	};
	types: { [key: string]: string } = {
		size: 'number',
		arrival: 'time',
		leave: 'time',
		date: 'date',
	};

	orderForm: FormGroup = this.fb.group({
		size: [1, [Validators.required, Validators.min(1)]],
		arrival: ['', [Validators.required, Validators.pattern(/\d\d:\d\d/)]],
		leave: ['', [Validators.pattern(/\d\d:\d\d/)]],
		date: ['', Validators.required],
		tableId: ['', Validators.required],
	});

	constructor(
		private orderService: OrderService,
		private searchService: SearchService,
		private fb: FormBuilder
	) {}

	ngOnInit(): void {
		this.searchRequest = this.searchService.lastSearchedQuery;

		this.controls = Object.keys(this.orderForm.controls).map((key) => {
			return {
				name: key,
				label: this.labels[key] || key,
				type: this.types[key] || 'text',
				stretch: key === 'query',
				disablabed: key === 'leave',
			};
		});
	}

	reserve() {
		if (this.orderForm.invalid) {
			this.orderForm.markAllAsTouched();
			return;
		}
	}
}
