import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-select-time',
	templateUrl: './select-time.component.html',
})
export class SelectTimeComponent {
	constructor(
		public dialogRef: MatDialogRef<SelectTimeComponent>,
		@Inject(MAT_DIALOG_DATA) public day: string
	) {}

	openingTime = '12:00';
	closingTime = '12:00';
	error = false;

	cancel(): void {
		this.dialogRef.close();
	}

	setClosedTime(time: string) {
		this.closingTime = time;
		this.validateTime();
	}

	setOpeningTime(time: string) {
		this.openingTime = time;
		this.validateTime();
	}

	private validateTime(): boolean {
		this.error = true;
		const isTimeRngValid =
			new Date().setHours(
				parseInt(this.closingTime.split(':')[0]),
				parseInt(this.closingTime.split(':')[1])
			) <=
			new Date().setHours(
				parseInt(this.openingTime.split(':')[0]),
				parseInt(this.openingTime.split(':')[1])
			);
		return isTimeRngValid;
	}

	save(): void {
		if (this.validateTime()) {
			return;
		}
		this.dialogRef.close(
			`{day: ${this.day}, hours: ${this.openingTime}-${this.closingTime}}`
		);
	}
}
