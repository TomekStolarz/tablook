import { RouterModule, Routes } from "@angular/router";
import { RegisterRestaurantComponent } from "./components/register-restaurant/register-restaurant.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
	{ path: '', component: RegisterRestaurantComponent },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class RegisterRestaurantRoutingModule {}
