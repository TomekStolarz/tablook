import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { AuthService } from 'src/app/services/auth.service';
import { selectUser } from 'src/app/store/user.selector';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
	user?: UserInfo;
	user$ = this.store.select(selectUser);

	constructor(private store: Store, private authService: AuthService) {}

	ngOnInit(): void {
		this.user$.subscribe((user) => (this.user = user));
		this.authService.isAuth().subscribe();
	}
}
