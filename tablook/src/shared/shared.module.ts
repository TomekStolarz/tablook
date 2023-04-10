import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorNotificationComponent } from './components/error-notification/error-notification.component';
import { TrimLengthPipe } from './pipes/trim-length.pipe';

@NgModule({
	imports: [MatSnackBarModule, MatCardModule, CommonModule],
	declarations: [ErrorNotificationComponent, TrimLengthPipe],
	exports: [ErrorNotificationComponent],
})
export class SharedModule {}
