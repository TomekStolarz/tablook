import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ConfirmationStatus } from 'src/home/restaurant-details/components/order/confirmatiom-status.enum';
import { OrderDetails } from 'src/home/restaurant-details/components/order/order-details.type';
import { Order } from 'src/home/restaurant-details/components/order/order.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderActionService {
  private readonly apiPath = environment.apiPath;

  private readonly http = inject(HttpClient);

  confirmationOrderUpdate(orderId: string, userId: string, confirmatiom: ConfirmationStatus): Observable<Order> {
    const body: Pick<OrderDetails, 'orderId' | 'confirmation'> = {
      orderId,
      confirmation: confirmatiom
    };
    return this.http.patch<Order>(`${this.apiPath}/order/confirm/${userId}`, body);
  }

}
