import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map, switchMap, tap } from 'rxjs';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { selectUser } from 'src/app/store/user.selector';
import { OrderDetails } from 'src/home/restaurant-details/components/order/order-details.type';
import { OrderService } from 'src/home/restaurant-details/services/order.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationsComponent {
  private readonly orderService = inject(OrderService);

  private readonly store = inject(Store);

  protected user?: UserInfo;

  protected orders: Observable<OrderDetails[]> = this.store.pipe(
    select(selectUser),
    tap((x) => this.user = x),
    map((user) => user?.id || ''),
    switchMap((id) => this.orderService.getOrders(id))
  );
}
