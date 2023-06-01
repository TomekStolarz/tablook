import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
})
export class MainComponent implements OnInit, OnDestroy{
	constructor(private router: Router,
		private responsive: BreakpointObserver) { }
	isMobile = false;
	responsiveSubscription?: Subscription;
	
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

	goToSearch() {
		this.router.navigate(['/home/search']);
	}
}
