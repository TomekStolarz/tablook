import { Component, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, map, switchMap } from 'rxjs';
import { RestaurantInfo } from 'src/app/interfaces/restaurant-info.interface';
import { selectUser } from 'src/app/store/user.selector';
import { OrderService } from 'src/home/restaurant-details/services/order.service';
import { RestaurantDetailsService } from 'src/home/restaurant-details/services/restaurant-details.service';

@Component({
  selector: 'app-restaurant-order',
  templateUrl: './restaurant-order.component.html',
  styleUrls: ['./restaurant-order.component.scss']
})
export class RestaurantOrderComponent {
  private readonly store = inject(Store);

  private readonly orderService = inject(OrderService);

  private readonly restaurantDetailsService = inject(RestaurantDetailsService);

  protected readonly restaurant: Observable<RestaurantInfo> = this.store.pipe(
    select(selectUser),
    map((user) => user?.id || ''),
    switchMap((id) => this.restaurantDetailsService.getRestaurantOrderDetails(id))
  );
}
