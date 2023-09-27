import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { RestaurantComponent } from "./components/restaurant/restaurant.component";
import { ReservationsComponent } from "src/account-module/components/reservations/reservations.component";

const routes: Route[] = [{
    path: '',
    component: RestaurantComponent,
    children: [
        {path: '', component: ReservationsComponent}
    ]
}   
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RestaurantRouterModule { }