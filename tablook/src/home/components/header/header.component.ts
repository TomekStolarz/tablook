import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
	@Input()
	username?: string;
	isMobile = false;
	responsiveSubscription?: Subscription;
	
	constructor(private authService: AuthService, private responsive: BreakpointObserver) {}

	ngOnInit(): void {
		this.responsiveSubscription = this.responsive.observe([Breakpoints.TabletPortrait, Breakpoints.HandsetPortrait])
			.subscribe((result) => {
				if (result.matches) {
					this.isMobile = true;
				} else {
					this.isMobile = false;
				}
			});
	}

	ngOnDestroy(): void {
		this.responsiveSubscription?.unsubscribe();
	}

	logout(): void {
		this.authService.logout();
	}
}
