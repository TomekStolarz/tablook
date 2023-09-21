import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/shared/shared.module";
import { RestaurantReservationsComponent } from './components/restaurant-reservations/restaurant-reservations.component';
import { RestaurantRouterModule } from "./restaurant-routing.module";

@NgModule({
    imports: [CommonModule, SharedModule, RestaurantRouterModule],
    declarations: [
    RestaurantReservationsComponent
  ],
})
export class RestaurantModule { }