import { Component, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map, switchMap } from 'rxjs';
import { selectUser } from 'src/app/store/user.selector';
import { OrderDetails } from 'src/home/restaurant-details/components/order/order-details.type';
import { Order } from 'src/home/restaurant-details/components/order/order.interface';
import { OrderService } from 'src/home/restaurant-details/services/order.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent {
  private readonly orderService = inject(OrderService);

  private readonly store = inject(Store);

  protected orders: Observable<OrderDetails[]> = this.store.pipe(
    select(selectUser),
    map((user) => user?.id || ''),
    switchMap((id) => this.orderService.getOrders(id))
  );
}
