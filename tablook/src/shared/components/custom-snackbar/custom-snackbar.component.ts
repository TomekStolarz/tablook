import { Component, Inject } from '@angular/core';
import {
	MAT_SNACK_BAR_DATA,
	MatSnackBarRef,
} from '@angular/material/snack-bar';
import { SnackbarData } from 'src/shared/interfaces/snackbar-data.interface';

@Component({
	selector: 'app-custom-snackbar',
	templateUrl: './custom-snackbar.component.html',
})
export class CustomSnackbarComponent {
	constructor(
		public snackBarRef: MatSnackBarRef<CustomSnackbarComponent>,
		@Inject(MAT_SNACK_BAR_DATA) public data: SnackbarData
	) {}
}
