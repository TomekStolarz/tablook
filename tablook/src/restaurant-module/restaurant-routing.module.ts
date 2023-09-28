import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { RestaurantComponent } from "./components/restaurant/restaurant.component";
import { ReservationsComponent } from "src/account-module/components/reservations/reservations.component";
import { RestaurantOrderComponent } from "./components/restaurant-order/restaurant-order.component";

const routes: Route[] = [{
    path: '',
    component: RestaurantComponent,
    children: [
        {path: '', redirectTo: 'reservations', pathMatch: 'full'},
        {path: 'reservations', component: ReservationsComponent},
        {path: 'order', component: RestaurantOrderComponent}
    ],
}   
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RestaurantRouterModule { }