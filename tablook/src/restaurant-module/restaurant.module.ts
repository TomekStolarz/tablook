import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/shared/shared.module";
import { RestaurantRouterModule } from "./restaurant-routing.module";
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { AccountModule } from "src/account-module/account.module";
import { RestaurantOrderComponent } from './components/restaurant-order/restaurant-order.component';
import { OrderComponent } from "src/home/restaurant-details/components/order/order.component";

@NgModule({
    imports: [CommonModule, SharedModule, RestaurantRouterModule, AccountModule, OrderComponent],
    declarations: [
      RestaurantComponent,
      RestaurantOrderComponent
    ],
})
export class RestaurantModule { }