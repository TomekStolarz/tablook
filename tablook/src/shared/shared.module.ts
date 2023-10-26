import { CommonModule, DatePipe } from '@angular/common';
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
import { SelectTablesComponent } from './components/select-tables/select-tables.component';
import { MatIconModule } from '@angular/material/icon';
import { TablesPipe } from './pipes/tables.pipe';
import { TagComponent } from './components/tag/tag.component';
import { TbDatePipe } from './pipes/tb-date.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { AddressFormatPipe } from './pipes/address-format.pipe';
import { DateToTimePipe } from './pipes/date-to-time.pipe';
import { IsoStringDatePipe } from './pipes/iso-string-date.pipe';
import { ImageDialogViewerComponent } from './components/image-dialog-viewer/image-dialog-viewer.component';

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
		MatIconModule,
	],
	declarations: [
		ErrorNotificationComponent,
		TrimLengthPipe,
		CustomSnackbarComponent,
		UpperFirstPipe,
		PhonePrefixPipe,
		SelectTimeComponent,
		SelectTablesComponent,
		TablesPipe,
		TagComponent,
		TbDatePipe,
		SafeUrlPipe,
		AddressFormatPipe,
  		DateToTimePipe,
    	IsoStringDatePipe,
     ImageDialogViewerComponent,
	],
	providers: [CustomSnackbarService, DatePipe],
	exports: [
		ErrorNotificationComponent,
		PhonePrefixPipe,
		SelectTimeComponent,
		TablesPipe,
		TagComponent,
		UpperFirstPipe,
		TbDatePipe,
		SafeUrlPipe,
		AddressFormatPipe,
		DateToTimePipe,
		IsoStringDatePipe,
	],
})
export class SharedModule {}
