import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorNotificationComponent } from './components/error-notification/error-notification.component';
import { TrimLengthPipe } from './pipes/trim-length.pipe';
import { CustomSnackbarComponent } from './components/custom-snackbar/custom-snackbar.component';
import { CustomSnackbarService } from './services/custom-snackbar.service';
import { UpperFirstPipe } from './pipes/upper-first.pipe';

@NgModule({
	imports: [MatSnackBarModule, MatCardModule, CommonModule],
	declarations: [
		ErrorNotificationComponent,
		TrimLengthPipe,
		CustomSnackbarComponent,
  UpperFirstPipe,
	],
	providers: [CustomSnackbarService],
	exports: [ErrorNotificationComponent],
})
export class SharedModule {}
