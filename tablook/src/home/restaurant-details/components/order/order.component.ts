import { ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { SearchService } from 'src/home/search-module/services/search.service';
import { SearchRequest } from 'src/home/search-module/interfaces/search-request.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Control } from 'src/filters-module/models/control.interface';
import { RestaurantInfo } from 'src/app/interfaces/restaurant-info.interface';
import { Order } from './order.interface';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { CustomSnackbarService } from 'src/shared/services/custom-snackbar.service';
import { Subject, Subscription, switchMap } from 'rxjs';
import { TableResult } from 'src/home/search-module/interfaces/table-result.interface';
import { RestaurantDetailsService } from '../../services/restaurant-details.service';
import { ConfirmationStatus } from './confirmatiom-status.enum';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgImageSliderModule } from 'ng-image-slider';
import { FilterModule } from 'src/filters-module/filters.module';
import { SharedModule } from 'src/shared/shared.module';
import { RestaurantDetailsRoutingModule } from '../../restaurant-details-routing.module';
import { FreeTableComponent } from '../free-table/free-table.component';
import { tableSizeValidator } from './table-size.validator.function';

@Component({
	selector: 'app-order',
	templateUrl: './order.component.html',
	standalone: true,
	imports: [
		SharedModule,
		CommonModule,
		RestaurantDetailsRoutingModule,
		NgImageSliderModule,
		MatIconModule,
		MatTooltipModule,
		FilterModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatSelectModule,
		FreeTableComponent
	]
})
export class OrderComponent implements OnInit, OnDestroy {
	@Input()
	restaurant!: RestaurantInfo;

	@Input()
	user?: UserInfo;

	@Input()
	clientName!: string;

	@Input()
	phone?: string;

	@Output()
	onReserveClick = new EventEmitter<void>();

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

	private subscription: Subscription[] = [];

	ngOnInit(): void {
		this.freeTables = [...this.restaurant.freeTables ?? []];
		if (this.restaurant.details?.tables) {
			this.orderForm.addValidators(tableSizeValidator(this.restaurant.details?.tables));
		} 

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
		this.onReserveClick.emit();

		if (!this.user && !this.clientName && !this.phone) {
			this.snackbarService.error("Form is not filled correctly", 'Cannot place order');
		}

		if (this.orderForm.invalid) {
			this.orderForm.markAllAsTouched();
			return;
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
			date: formData.date ?
				`${formData.date.getFullYear()}-${formData.date.getMonth() + 1 < 10 ? `0${formData.date.getMonth() + 1}` : formData.date.getMonth() + 1}-${formData.date.getDate() < 10 ? `0${formData.date.getDate()}` : formData.date.getDate()}T00:00:00.000Z`
				: new Date().toISOString(),
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
				endTime: endTime ? new Date(endTime) : undefined,
			},
			confirmation: ConfirmationStatus.UNCONFIRMED,
			clientName: this.user?.name ? `${this.user.name} ${this.user.surname}` : `${this.clientName}`,
			phone: this.phone ?? ''
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
