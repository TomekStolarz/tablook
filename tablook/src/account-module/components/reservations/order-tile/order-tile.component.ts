import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, OnInit, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderActionService } from 'src/account-module/services/order-action.service';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { ConfirmationStatus } from 'src/home/restaurant-details/components/order/confirmatiom-status.enum';
import { OrderDetails } from 'src/home/restaurant-details/components/order/order-details.type';

@Component({
  selector: 'app-order-tile',
  templateUrl: './order-tile.component.html',
  styleUrls: ['./order-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderTileComponent implements OnInit, OnDestroy{

  private readonly orderActionService = inject(OrderActionService);

  private readonly cdRef = inject(ChangeDetectorRef);

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

  private subscriptions: Subscription[] = [];

  ngOnInit(): void {
    const date = Number(new Date(this.order.date));
    const currentDate = Number(new Date());
    this.iconTooltip = this.tootltipMap[this.order.confirmation];

    if (currentDate > date && this.order.confirmation === ConfirmationStatus.CONFIRMED) {
      this.backgroud = '#0e8d7e';
    }

    if (this.order.confirmation === ConfirmationStatus.REJECTED) {
      this.backgroud = '#ffe1dd';
    }
  }

  onConfirmClick() {
    if (this.order.confirmation !== ConfirmationStatus.UNCONFIRMED) {
      return;
    }
    this.subscriptions.push(this.orderActionService.confirmationOrderUpdate(this.order.orderId, `${this.user?.id}`, ConfirmationStatus.CONFIRMED).subscribe(() => {
      this.order = { ...this.order, confirmation: ConfirmationStatus.CONFIRMED };
      this.cdRef.detectChanges();
    }));
  }

  onRejectClick() {
    if (this.order.confirmation !== ConfirmationStatus.UNCONFIRMED) {
      return;
    }
    this.subscriptions.push(this.orderActionService.confirmationOrderUpdate(this.order.orderId, `${this.user?.id}`, ConfirmationStatus.REJECTED).subscribe(() => {
      this.order = { ...this.order, confirmation: ConfirmationStatus.REJECTED };
      this.cdRef.detectChanges();
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
