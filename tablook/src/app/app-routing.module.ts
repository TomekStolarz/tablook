import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TbCountryPhoneCodeService } from './services/tb-country-phone-code.service';
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
