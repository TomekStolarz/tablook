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

	currentTime = '';
	timeRegex = /\d\d:\d\d/;
	disabled = false;
	minDate = new Date();

	ngOnInit(): void {
		if (this.control.disablabed) {
			this.form.get(this.control.name)?.disable();
			this.disabled = true;
		}
		if (this.control.type === 'time') {
			const date = new Date();
			this.currentTime = `${date.getHours()}:${date.getMinutes()}`;
		}
	}

	changeDisabled(isChecked: boolean) {
		if (isChecked) {
			this.form.get(this.control.name)?.enable();
			this.disabled = false;
		} else {
			const contr = this.form.get(this.control.name);
			contr?.reset();
			contr?.disable();
			this.disabled = true;
		}
	}

	updateTime(time: string) {
		this.form.get(this.control.name)?.setValue(time);
	}
}
