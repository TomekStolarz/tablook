import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from './components/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/user.reducer';
import { AuthInterceptor } from './guards/auth.interceptor';

@NgModule({
	declarations: [AppComponent, HeaderComponent, HomeComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		MatButtonModule,
		MatIconModule,
		BrowserAnimationsModule,
		HttpClientModule,
		StoreModule.forRoot({ user: userReducer }),
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true,
		},
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
