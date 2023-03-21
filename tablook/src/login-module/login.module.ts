import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginRoutingModule } from './login-routing.module';
import {
	ErrorStateMatcher,
	ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [LoginComponent],
	imports: [
		ReactiveFormsModule,
		MatInputModule,
		MatButtonModule,
		LoginRoutingModule,
		CommonModule,
	],
	providers: [
		{ provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
	],
	exports: [],
})
export class LoginModule {}
