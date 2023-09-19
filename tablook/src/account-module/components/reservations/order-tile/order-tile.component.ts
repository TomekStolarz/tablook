import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { ConfirmationStatus } from 'src/home/restaurant-details/components/order/confirmatiom-status.enum';
import { OrderDetails } from 'src/home/restaurant-details/components/order/order-details.type';

@Component({
  selector: 'app-order-tile',
  templateUrl: './order-tile.component.html',
  styleUrls: ['./order-tile.component.scss']
})
export class OrderTileComponent implements OnInit{
  @Input()
  order!: OrderDetails;

  @Input()
  user?: UserInfo;

  @HostBinding('style.background')
  private backgroud!: string;

  private tootltipMap: {[key: number]: string} = {
    1: 'Reservation confirmed',
    2: 'Reservation rejected',
    0: 'Reservation unconfirmed',
  }

  protected iconTooltip!: string;

  ngOnInit(): void {
    const date = Number(new Date(this.order.date));
    const currentDate = Number(new Date());
    if (currentDate > date && this.order.confirmation === ConfirmationStatus.CONFIRMED) {
      this.backgroud = '#0e8d7e';
    }

    if (this.order.confirmation === ConfirmationStatus.REJECTED) {
      this.backgroud = '#ffe1dd';
    }

    this.iconTooltip = this.tootltipMap[this.order.confirmation];
  }
}
