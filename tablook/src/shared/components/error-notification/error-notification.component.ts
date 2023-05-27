import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-error-notification',
	templateUrl: './error-notification.component.html',
})
export class ErrorNotificationComponent {
	@Input()
	error?: string;
}
