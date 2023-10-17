import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of, map, partition, reduce, switchMap, tap, combineLatestWith } from 'rxjs';
import { PaginatorData } from 'src/app/interfaces/paginator.model';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { OrderPaginatorAction } from 'src/app/store/order-paginator/order-paginator.actions';
import { selectOrderPaginator } from 'src/app/store/order-paginator/order-paginator.selector';
import { selectUser } from 'src/app/store/user.selector';
import { ConfirmationStatus } from 'src/home/restaurant-details/components/order/confirmatiom-status.enum';
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

  protected paginatorData = this.store.pipe(select(selectOrderPaginator));

  protected user?: UserInfo;

  protected orders: Observable<{ finished: OrderDetails[], future: OrderDetails[], active: OrderDetails[], total: number }> = this.store.pipe(
    select(selectUser),
    tap((x) => this.user = x),
    map((user) => user?.id || ''),
    combineLatestWith(this.paginatorData),
    switchMap(([id, paginatorData]) => this.orderService.getOrders(id, paginatorData.pageIndex, paginatorData.pageSize)),
    map((ordersInfo) => {
      return {
        finished: ordersInfo.orders.filter((order) => order.finished || order.confirmation === ConfirmationStatus.REJECTED),
        future: ordersInfo.orders.filter((order) => !order.finished && !order.active && order.confirmation !== ConfirmationStatus.REJECTED),
        active: ordersInfo.orders.filter((order) => order.active && order.confirmation === ConfirmationStatus.CONFIRMED),
        total: ordersInfo.total
      }
    }),
  );

  handlePageEvent(paginatorData: PaginatorData) {
    this.store.dispatch(OrderPaginatorAction.setPageindex({pageIndex: paginatorData.pageIndex}))
    this.store.dispatch(OrderPaginatorAction.setPagesize({pageSize: paginatorData.pageSize}))
  }
}
