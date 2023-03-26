import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const matchPasswordValidator: ValidatorFn = (
	group: AbstractControl
): ValidationErrors | null => {
	const pass = group.get('password')?.value;
	const confirmPass = group.get('passwordRepeat')?.value;
	return pass === confirmPass ? null : { notSame: true };
};
