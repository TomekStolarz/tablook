import { Component, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from 'src/app/store/user.selector';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
})
export class HomeComponent  {
	private readonly store = inject(Store);
	
	user$ = this.store.select(selectUser);
	
}
