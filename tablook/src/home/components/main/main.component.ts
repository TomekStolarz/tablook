import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-main',
	templateUrl: './main.component.html',
})
export class MainComponent {
	constructor(private router: Router) {}

	goToSearch() {
		this.router.navigate(['/home/search']);
	}
}
