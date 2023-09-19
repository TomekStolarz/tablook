import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Order } from '../components/order/order.interface';
import { CustomSnackbarService } from 'src/shared/services/custom-snackbar.service';
import { EMPTY, catchError, tap } from 'rxjs';
import { OrderDetails } from '../components/order/order-details.type';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  apiPath = environment.apiPath;
  
  constructor(private http: HttpClient, private customSnackbar: CustomSnackbarService) { }

  postOrder(order: Order) {
    if (!order.userId) {
      this.customSnackbar.error(`You must be logged to place order`, 'Error');
      return;
    }
    return this.http.post(`${this.apiPath}/order`, order).pipe(
      tap(() => this.customSnackbar.success('Successfully placed order', 'Success')),
      catchError((x: HttpErrorResponse) => {
        this.customSnackbar.error(`Cannot place order ${x.error?.message?.message || x.message}`, 'Error')
        return EMPTY;
      })
    );
  }

  getOrders(userId: string) {
    return this.http.get<OrderDetails[]>(`${this.apiPath}/order/${userId}`);
  }
}
