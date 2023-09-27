import { Component, Input, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { SearchService } from 'src/home/search-module/services/search.service';
import { SearchRequest } from 'src/home/search-module/interfaces/search-request.interface';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Control } from 'src/filters-module/models/control.interface';
import { RestaurantInfo } from 'src/app/interfaces/restaurant-info.interface';
import { Order } from './order.interface';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { CustomSnackbarService } from 'src/shared/services/custom-snackbar.service';
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
export class OrderComponent implements OnInit {
	@Input()
	restaurant!: RestaurantInfo;

	searchRequest?: SearchRequest;
	@Input()
	user?: UserInfo;

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
		date: [new Date(), Validators.required],
		tableId: ['', Validators.required],
	});

	constructor(
		private orderService: OrderService,
		private searchService: SearchService,
		private fb: FormBuilder,
		private snackbarService: CustomSnackbarService
	) {}

	ngOnInit(): void {
		this.searchRequest = this.searchService.lastSearchedQuery;
		if (this.searchRequest) {
			this.orderForm.get('date')?.setValue(this.searchRequest.date);
			this.orderForm.get('size')?.setValue(this.searchRequest.size);
			this.orderForm.get('arrival')?.setValue(this.searchRequest.arrival);
			this.orderForm.get('leave')?.setValue(this.searchRequest.leave);
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

		this.orderForm.valueChanges.subscribe((x) => {
			this.orderForm.get("size")?.setErrors(null);
			this.tableId?.setErrors(null);
		})
	}

	reserve() {
		if (this.orderForm.invalid) {
			this.orderForm.markAllAsTouched();
			return;
		}
		const selectedTable = this.restaurant.details?.tables.find((table) => table.id = this.tableId?.value);
		if (selectedTable?.seats && selectedTable.seats < this.orderForm.get("size")?.value) {
			this.orderForm.get("size")?.setErrors({ toSmallTable: true });
			this.tableId?.setErrors({ toSmallTable: true });
		}

		const request = this.prepareOrderRequest();

		if (request) {
			this.orderService.postOrder(request)?.subscribe();
		} else {
			this.snackbarService.error("Form is not filled correctly", 'Cannot place order');
		}
	}

	get tableId() {
		return this.orderForm.get('tableId');
	}

	prepareOrderRequest(): Order | undefined {
		const startTimeParts = this.orderForm.get('arrival')?.value.split(":").map((x: string) => parseInt(x));
		const startTime = new Date().setHours(startTimeParts[0], startTimeParts[1]);
		let endTime = 0;
		if (this.orderForm.get('leave')?.value) {
			const endTimeParts = this.orderForm.get('leave')?.value.split(":").map((x: string) => parseInt(x));
			const endTime = new Date().setHours(endTimeParts[0], endTimeParts[1]);
		}
		
		const order: Order = {
			userId: this.user?.id || '',
			restaurantId: this.restaurant.id || '',
			tableId: this.tableId?.value,
			tableSize: this.orderForm.get('size')?.value,
			date: new Date(this.orderForm.get('date')?.value),
			time: {
				startTime: new Date(startTime),
				endTime: endTime || this.orderForm.get('leave')?.value
			},
			confirmation: ConfirmationStatus.UNCONFIRMED,
		}
		if (Object.values(order).find((val) => val === undefined))
		{
			return undefined;
		}
		return order;
	}
}
