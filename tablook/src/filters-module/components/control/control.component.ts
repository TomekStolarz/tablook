import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Control } from 'src/filters-module/models/control.interface';

@Component({
	selector: 'app-control',
	templateUrl: './control.component.html',
})
export class ControlComponent implements OnInit {
	@Input()
	control!: Control;

	@Input()
	form!: FormGroup;

	ngOnInit(): void {
		if (this.control.disablabed) {
			this.form.get(this.control.name)?.disable();
		}
	}

	changeDisabled(isChecked: boolean) {
		if (isChecked) {
			this.form.get(this.control.name)?.enable();
		} else {
			const contr = this.form.get(this.control.name);
			contr?.reset();
			contr?.disable();
		}
	}
}
