import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserInfo } from './interfaces/user-info.interface';
import { selectUser } from './store/user.selector';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
	title = 'tablook';
	user?: UserInfo;
	user$ = this.store.select(selectUser);

	constructor(private store: Store) {}

	ngOnInit(): void {
		this.user$.subscribe((user) => (this.user = user));
	}
}
