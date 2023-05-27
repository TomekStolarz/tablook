import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
	{
		path: '',
		component: HomeComponent,
		title: 'Home',
		children: [
			{ path: '', redirectTo: 'main', pathMatch: 'full' },
			{ path: 'main', component: MainComponent },
			{
				path: 'restaurant',
				loadChildren: () =>
					import(
						'./restaurant-details/restaurant-detials.module'
					).then((m) => m.RestaurantDetailsModule),
			},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class HomeRoutingModule {}
