import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authCantMatch } from './guards/auth-cant-match.guard';

const routes: Routes = [
	{
		path: 'home',
		loadChildren: () =>
			import('../home/home.module').then((m) => m.HomeModule),
	},
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
	{ path: '', redirectTo: '/home/main', pathMatch: 'full' },
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
