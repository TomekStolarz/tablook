import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const validPassword =
			/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
				control.value
			);
		const errorMessages: string[] = [];
		const errorCases = [
			{ regex: /\d/, message: 'Should have at least one number' },
			{ regex: /\[A-Za-z]/, message: 'Should have at least one letter' },
			{
				regex: /[@$!%*#?&]/,
				message: 'Should have at least one special character',
			},
		];
		if (!validPassword) {
			errorCases.forEach((c) => {
				if (!c.regex.test(control.value)) {
					errorMessages.push(c.message);
				}
			});
		}
		return !validPassword ? { errors: errorMessages } : null;
	};
}
