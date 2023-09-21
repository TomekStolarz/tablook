import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { authGuard } from 'src/app/guards/auth.guard';
import { customerGuard } from 'src/app/guards/customer.guard';
import { restaurantGuard } from 'src/app/guards/restaurant.guard';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		title: 'Home',
		children: [
			{ path: '', redirectTo: 'main', pathMatch: 'full' },
			{ path: 'main', canActivate: [customerGuard], component: MainComponent },
			{
				path: 'restaurant',
				canActivate: [customerGuard],
				loadChildren: () =>
					import(
						'./restaurant-details/restaurant-detials.module'
					).then((m) => m.RestaurantDetailsModule),
			},
			{
				path: 'search',
				canActivate: [customerGuard],
				loadChildren: () =>
					import('./search-module/search.module').then(
						(m) => m.SearchModule
					),
			},
			{
				path: 'account-details',
				canActivate: [authGuard, customerGuard],
				loadChildren: () => import('../account-module/account.module').then(
					(m) => m.AccountModule
				),
			},
			{
				path: 'restaurant-account',
				canActivate: [authGuard, restaurantGuard],
				loadChildren: () => import('../restaurant-module/restaurant.module').then(
					(m) => m.RestaurantModule
				),
			}
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class HomeRoutingModule {}
