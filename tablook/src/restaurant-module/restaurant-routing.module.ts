import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { RestaurantComponent } from "./components/restaurant/restaurant.component";
import { ReservationsComponent } from "src/account-module/components/reservations/reservations.component";
import { RestaurantOrderComponent } from "./components/restaurant-order/restaurant-order.component";
import { ContactComponent } from "src/account-module/components/contact/contact.component";
import { SettingComponent } from "./components/setting/setting.component";

const routes: Route[] = [{
    path: '',
    component: RestaurantComponent,
    children: [
        { path: '', redirectTo: 'reservations', pathMatch: 'full' },
        { path: 'reservations', component: ReservationsComponent },
        { path: 'order', component: RestaurantOrderComponent },
        { path: 'contact', component: ContactComponent },
        { path: 'setting', component: SettingComponent },
    ],
}   
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class RestaurantRouterModule { }