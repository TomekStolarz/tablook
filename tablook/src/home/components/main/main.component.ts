import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectUser } from 'src/app/store/user.selector';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
})
export class MainComponent implements OnInit, OnDestroy{
	private readonly router = inject(Router);
	private readonly responsive = inject(BreakpointObserver);
	protected readonly user = inject(Store).pipe(select(selectUser));

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
