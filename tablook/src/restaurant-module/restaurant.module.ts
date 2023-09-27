import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/shared/shared.module";
import { RestaurantRouterModule } from "./restaurant-routing.module";
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { AccountModule } from "src/account-module/account.module";

@NgModule({
    imports: [CommonModule, SharedModule, RestaurantRouterModule, AccountModule],
    declarations: [
      RestaurantComponent
    ],
})
export class RestaurantModule { }