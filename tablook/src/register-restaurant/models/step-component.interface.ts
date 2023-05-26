import { FormGroup } from '@angular/forms';
import { ErrorStateStrategy } from 'src/shared/directives/match-error-strategy';

export abstract class StepComponent {
	abstract form: FormGroup;
	abstract key: string;
	abstract controls: string[];

	protected matcher = new ErrorStateStrategy();

	validatePart() {
		let valid = true;
		this.controls.forEach((controlName) => {
			valid = valid && this.form.controls[controlName].valid;
			this.form.controls[controlName].markAsTouched();
		});
		if (!valid) {
			this.form.setErrors({ [this.key]: true, ...this.form.errors });
			return;
		}
	}
}
