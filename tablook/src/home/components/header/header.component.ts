import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
	@Input()
	username?: string;
	isMobile = false;

	constructor(private authService: AuthService, private responsive: BreakpointObserver) {}

	ngOnInit(): void {
		this.responsive.observe([Breakpoints.TabletPortrait, Breakpoints.HandsetPortrait])
			.subscribe((result) => {
				if (result.matches) {
					this.isMobile = true;
				} else {
					this.isMobile = false;
				}
			});
	}

	logout(): void {
		this.authService.logout();
	}
}
