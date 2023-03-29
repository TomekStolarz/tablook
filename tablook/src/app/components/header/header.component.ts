import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
})
export class HeaderComponent {
	@Input()
	username?: string;

	openLoginPanel(): void {}

	openRegisterPanel(): void {}

	logout(): void {}
}
