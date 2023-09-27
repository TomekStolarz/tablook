import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AccountComponent } from "./components/account.component";
import { SettingsComponent } from "./components/settings/settings.component";
import { ContactComponent } from "./components/contact/contact.component";
import { FavouritesComponent } from "./components/favourites/favourites.component";
import { ReservationsComponent } from "./components/reservations/reservations.component";

const routes: Route[] = [
    {
        path: '',
        component: AccountComponent,
        children: [
            {path: '', redirectTo: 'settings', pathMatch: "full"},
            {path: 'settings', component: SettingsComponent},
            {path: 'reservations', component: ReservationsComponent},
            {path: 'favourites', component: FavouritesComponent},
            {path: 'contact', component: ContactComponent},
        ],
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule]
})
export class AccountRoutingModule{ }