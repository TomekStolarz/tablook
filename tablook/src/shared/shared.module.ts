import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorNotificationComponent } from './components/error-notification/error-notification.component';

@NgModule({
	imports: [MatSnackBarModule, MatCardModule, CommonModule],
	declarations: [ErrorNotificationComponent],
	exports: [ErrorNotificationComponent],
})
export class SharedModule {}
