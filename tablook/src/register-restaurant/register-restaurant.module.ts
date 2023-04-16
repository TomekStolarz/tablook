import { NgModule } from '@angular/core';
import { RegisterRestaurantComponent } from './components/register-restaurant/register-restaurant.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@NgModule({
	declarations: [RegisterRestaurantComponent],
	imports: [
		CommonModule,
		MatInputModule,
		MatButtonModule,
		ReactiveFormsModule,
		SharedModule,
	],
})
export class RegisterRestaurantModule {}
