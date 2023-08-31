import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { SearchService } from 'src/home/search-module/services/search.service';
import { SearchRequest } from 'src/home/search-module/interfaces/search-request.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Control } from 'src/filters-module/models/control.interface';
import { RestaurantInfo } from 'src/app/interfaces/restaurant-info.interface';
import { Order } from './order.interface';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { CustomSnackbarService } from 'src/shared/services/custom-snackbar.service';
import { Subject, Subscription, switchMap } from 'rxjs';
import { TableResult } from 'src/home/search-module/interfaces/table-result.interface';
import { RestaurantDetailsService } from '../../services/restaurant-details.service';

@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
})
export class OrderComponent implements OnInit, OnDestroy {
	@Input()
	restaurant!: RestaurantInfo;

	@Input()
	user?: UserInfo;

	private readonly orderService = inject(OrderService);
	private readonly searchService = inject(SearchService);
	private readonly fb = inject(FormBuilder);
	private readonly snackbarService = inject(CustomSnackbarService);
	private readonly detailsService = inject(RestaurantDetailsService);
	
	private searchRequest!: SearchRequest;

	protected freeTables: TableResult[] = [];

	private readonly getFreeTables$ = new Subject<void>();
	
	protected controls: Control[] = [];
	
	private labels: { [key: string]: string } = {
		size: 'Table size',
	};
	
	private types: { [key: string]: string } = {
		size: 'number',
		arrival: 'time',
		leave: 'time',
		date: 'date',
	};

	protected orderForm = this.fb.nonNullable.group({
		size: [1, [Validators.required, Validators.min(1)]],
		arrival: ['', [Validators.required, Validators.pattern(/\d\d:\d\d/)]],
		leave: ['', [Validators.pattern(/\d\d:\d\d/)]],
		date: [new Date(), Validators.required],
		tableId: ['', Validators.required],
	});

	private subscription: Subscription[] = []


	ngOnInit(): void {
		this.freeTables = [ ...this.restaurant.freeTables ?? [] ];

		this.searchRequest = this.searchService.lastSearchedQuery || {date: new Date().toDateString(), size: 1};
		if (this.searchRequest) {
			this.orderForm.controls.date.setValue(new Date(this.searchRequest.date));
			this.orderForm.controls.size.setValue(this.searchRequest.size);
			this.orderForm.controls.arrival.setValue(this.searchRequest.arrival ?? '');
			this.orderForm.controls.leave.setValue(this.searchRequest.leave ?? '');
		}

		this.controls = Object.keys(this.types).map((key) => {
			return {
				name: key,
				label: this.labels[key] || key,
				type: this.types[key] || 'text',
				stretch: key === 'query',
				disablabed: key === 'leave',
			};
		});

		this.subscription.push(this.orderForm.valueChanges.subscribe((x) => {
			this.orderForm.controls.size.setErrors(null);
			this.tableId?.setErrors(null);
		}));

		this.subscription.push(
			this.getFreeTables$.pipe(
				switchMap(() =>
					this.detailsService.getFreeTables(this.restaurant.id, this.formParsedValue())
					)
			).subscribe((tables) =>{
				this.freeTables = tables.map((table) => {
					const _table = this.restaurant.details?.tables.find(
					  (tb) => (tb.id === table.tableId),
					);
					return {
					  id: _table?.id || '',
					  seats: _table?.seats || 1,
					  available: table.available,
					};
				});
			})
		)
	}

	refresh() {
		this.getFreeTables$.next();
	}

	reserve() {
		if (this.orderForm.invalid) {
			this.orderForm.markAllAsTouched();
			return;
		}
		const selectedTable = this.restaurant.details?.tables.find((table) => table.id === this.tableId?.value)!;
		if (selectedTable?.seats && selectedTable.seats < this.orderForm.value.size!) {
			this.orderForm.controls.size.setErrors({ toSmallTable: true });
			this.tableId.setErrors({ toSmallTable: true });
		}

		const request = this.prepareOrderRequest();

		if (request) {
			this.orderService.postOrder(request)?.subscribe();
		} else {
			this.snackbarService.error("Form is not filled correctly", 'Cannot place order');
		}
	}

	get tableId() {
		return this.orderForm.controls.tableId;
	}

	private formParsedValue(): SearchRequest {
		const formData = this.orderForm.getRawValue();
		const request: SearchRequest  = {
			date: formData.date.toISOString() ?? new Date().toISOString(),
			size: formData.size,
			arrival: formData.arrival.trim(),
			leave: formData.leave?.trim(),
		};
		Object.entries(request).forEach(([key, value]) => {
			if (!value) {
				delete request[key as keyof typeof request];
			}
		});

		return request;
	}

	prepareOrderRequest(): Order | undefined {
		const startTimeParts = this.orderForm.controls.arrival.value.split(":").map((x: string) => parseInt(x));
		const startTime = new Date().setHours(startTimeParts[0], startTimeParts[1]);
		let endTime = 0;
		if (this.orderForm.controls.leave.value) {
			const endTimeParts = this.orderForm.controls.leave.value.split(":").map((x: string) => parseInt(x));
			endTime = endTimeParts ? new Date().setHours(endTimeParts[0], endTimeParts[1]) : new Date().getTime();
		}
		

		const order: Order = {
			userId: this.user?.id || '',
			restaurantId: this.restaurant.id || '',
			tableId: this.orderForm.controls.tableId.value,
			tableSize: this.orderForm.controls.size.value,
			date: new Date(this.orderForm.controls.date.value),
			time: {
				startTime: new Date(startTime),
				endTime: new Date(endTime),
			}
		}
		if (Object.values(order).find((val) => val === undefined))
		{
			return undefined;
		}
		return order;
	}

	ngOnDestroy(){
		this.subscription.forEach((sub) => sub.unsubscribe());
	}
}
