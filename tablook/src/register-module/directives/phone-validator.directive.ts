import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function phoneValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const validPhone = /^\d{3}[-\s]?\d{3}[-\s]?\d{3,4}$/.test(
			control.value
		);
		return !validPhone
			? { errors: 'Thats not looklike phone number' }
			: null;
	};
}
