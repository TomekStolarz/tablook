import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../components/custom-snackbar/custom-snackbar.component';

@Injectable({
	providedIn: 'root',
})
export class CustomSnackbarService {
	constructor(private matSnack: MatSnackBar) {}

	success(message: string, header: string) {
		this.matSnack.openFromComponent(CustomSnackbarComponent, {
			duration: 5000,
			horizontalPosition: 'end',
			verticalPosition: 'bottom',
			panelClass: 'success',
			data: { message: message, header: header },
		});
	}
}
