import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
	{ path: 'home', component: HomeComponent },
	{
		path: 'login',
		loadChildren: () =>
			import('../login-module/login.module').then((m) => m.LoginModule),
	},
	{
		path: 'register',
		loadChildren: () =>
			import('../register-module/register.module').then(
				(m) => m.RegisterModule
			),
	},
	{ path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
