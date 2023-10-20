import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderActionService } from 'src/account-module/services/order-action.service';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { ConfirmationStatus } from 'src/home/restaurant-details/components/order/confirmatiom-status.enum';
import { OrderDetails } from 'src/home/restaurant-details/components/order/order-details.type';
import { FinishOrderDialogComponent } from '../finish-order-dialog/finish-order-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-order-tile',
  templateUrl: './order-tile.component.html',
  styleUrls: ['./order-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderTileComponent implements OnDestroy{

  private readonly orderActionService = inject(OrderActionService);

  private readonly cdRef = inject(ChangeDetectorRef);

  private readonly dialog = inject(MatDialog);

  private _order!: OrderDetails;

  @Input()
  set order(order: OrderDetails) {
    this._order = order;
    this.setColors();
  }  
    
  get order(): OrderDetails {
    return this._order;
  };


  @Input()
  user?: UserInfo;

  @HostBinding('style.background')
  private backgroud!: string;

  @HostBinding('style.color')
  private textcolor!: string;

  private tootltipMap: {[key: number]: string} = {
    1: 'Reservation confirmed',
    2: 'Reservation rejected',
    0: 'Reservation unconfirmed',
  }

  protected iconTooltip!: string;

  private subscriptions: Subscription[] = [];

  setColors() {
    if (!this.order) {
      return;
    }

    const date = Number(new Date(this.order.date));
    const currentDate = Number(new Date());
    this.iconTooltip = this.tootltipMap[this.order.confirmation];

    if (currentDate > date && this.order.confirmation === ConfirmationStatus.CONFIRMED) {
      this.backgroud = '#0e8d7e';
      this.textcolor = '#ffffff';
    }

    if (this.order.confirmation === ConfirmationStatus.REJECTED || (this.order.confirmation === ConfirmationStatus.UNCONFIRMED && this.order.finished)) {
      this.backgroud = 'rgb(205 76 45)';
      this.textcolor = '#ffffff';
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

  onFinishClick() {
    this.openFinishDialog();
  }

  openFinishDialog(): void {
    const dialogRef = this.dialog.open(FinishOrderDialogComponent);

    this.subscriptions.push(dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      this.orderActionService.finishOrder(this.order.orderId, `${this.user?.id}`);
      window.location.reload();
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }
}
