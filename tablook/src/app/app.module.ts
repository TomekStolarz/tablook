import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/user.reducer';
import { AuthInterceptor } from './guards/auth.interceptor';
import { HomeModule } from 'src/home/home.module';
import { MatNativeDateModule } from '@angular/material/core';
import { orderPaginatorReducer } from './store/order-paginator/order-paginator.reducer';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		StoreModule.forRoot({ user: userReducer, ordersPaginator: orderPaginatorReducer }),
		HomeModule,
		MatNativeDateModule,
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
