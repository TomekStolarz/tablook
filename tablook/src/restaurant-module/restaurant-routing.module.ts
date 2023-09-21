import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { RestaurantReservationsComponent } from "./components/restaurant-reservations/restaurant-reservations.component";

const routes: Route[] = [{path: '', component: RestaurantReservationsComponent}]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RestaurantRouterModule { }