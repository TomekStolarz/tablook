import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/components/home/home.component';
import { authCantMatch } from './guards/auth-cant-match.guard';

const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	{
		path: 'login',
		canMatch: [authCantMatch],
		loadChildren: () =>
			import('../login-module/login.module').then((m) => m.LoginModule),
	},
	{
		path: 'register',
		canMatch: [authCantMatch],
		children: [
			{
				path: 'customer',
				loadChildren: () =>
					import('../register-module/register.module').then(
						(m) => m.RegisterModule
					),
			},
			{
				path: 'restaurant',
				loadChildren: () =>
					import(
						'../register-restaurant/register-restaurant.module'
					).then((m) => m.RegisterRestaurantModule),
			},
		],
	},
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
	{
		path: '**',
		loadComponent: () =>
			import('./components/not-found/not-found.component').then(
				(mod) => mod.NotFoundComponent
			),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
