import { Component, Input } from '@angular/core';
import { OrderDetails } from 'src/home/restaurant-details/components/order/order-details.type';

@Component({
  selector: 'app-order-tile',
  templateUrl: './order-tile.component.html',
  styleUrls: ['./order-tile.component.scss']
})
export class OrderTileComponent {
  @Input()
  order!: OrderDetails;
}
