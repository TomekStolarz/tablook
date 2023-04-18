import { NgModule } from '@angular/core';
import { RegisterRestaurantComponent } from './components/register-restaurant/register-restaurant.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { RegisterRestaurantRoutingModule } from './register-restaurant-routing.module';

@NgModule({
	declarations: [RegisterRestaurantComponent],
	imports: [
		RegisterRestaurantRoutingModule,
		CommonModule,
		MatInputModule,
		MatButtonModule,
		ReactiveFormsModule,
		SharedModule,
	],
})
export class RegisterRestaurantModule {}
