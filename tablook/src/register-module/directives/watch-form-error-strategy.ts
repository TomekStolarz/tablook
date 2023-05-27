import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class WatchRepeatPasswordErrorStrategy implements ErrorStateMatcher {
	isErrorState(
		control: FormControl | null,
		form: FormGroupDirective | NgForm | null
	): boolean {
		return !!(
			control &&
			form &&
			control.touched &&
			form.errors?.['notSame'] &&
			form.submitted
		);
	}
}
