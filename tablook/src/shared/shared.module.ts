import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorNotificationComponent } from './components/error-notification/error-notification.component';
import { TrimLengthPipe } from './pipes/trim-length.pipe';
import { CustomSnackbarComponent } from './components/custom-snackbar/custom-snackbar.component';
import { CustomSnackbarService } from './services/custom-snackbar.service';
import { UpperFirstPipe } from './pipes/upper-first.pipe';
import { PhonePrefixPipe } from './pipes/phone-prefix.pipe';
import { SelectTimeComponent } from './components/select-time/select-time.component';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	imports: [
		MatSnackBarModule,
		MatCardModule,
		CommonModule,
		MatDialogModule,
		MatButtonModule,
		MatInputModule,
		ReactiveFormsModule,
		NgxMatTimepickerModule,
	],
	declarations: [
		ErrorNotificationComponent,
		TrimLengthPipe,
		CustomSnackbarComponent,
		UpperFirstPipe,
		PhonePrefixPipe,
		SelectTimeComponent,
	],
	providers: [CustomSnackbarService],
	exports: [ErrorNotificationComponent, PhonePrefixPipe, SelectTimeComponent],
})
export class SharedModule {}
