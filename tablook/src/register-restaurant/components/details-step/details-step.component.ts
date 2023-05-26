import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { OpeningHours } from 'src/register-restaurant/models/opening-hours.interface';
import { StepComponent } from 'src/register-restaurant/models/step-component.interface';
import { SelectTablesComponent } from 'src/shared/components/select-tables/select-tables.component';
import { SelectTimeComponent } from 'src/shared/components/select-time/select-time.component';
import { ErrorStateStrategy } from 'src/shared/directives/match-error-strategy';

@Component({
	selector: 'app-details-step',
	templateUrl: './details-step.component.html',
})
export class DetailsStepComponent extends StepComponent implements OnInit {
	@Input()
	form!: FormGroup;

	matcher = new ErrorStateStrategy();

	controls = [
		'description',
		'tags',
		'googleMapsLink',
		'tables',
		'openingHours',
	];

	key = 'detailsError';

	days = [
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
		'Sunday',
	];

	constructor(private fb: FormBuilder, private dialog: MatDialog) {
		super();
	}

	ngOnInit(): void {
		this.form.addControl(
			'description',
			this.fb.control('', Validators.required)
		);
		this.form.addControl(
			'tags',
			this.fb.control([''], Validators.required)
		);
		this.form.addControl(
			'googleMapsLink',
			this.fb.control('', Validators.required)
		);
		this.form.addControl(
			'tables',
			this.fb.control('', Validators.required)
		);
		this.form.addControl(
			'openingHours',
			this.fb.control('', Validators.required)
		);
	}

	@Input()
	openingDayWithHours: OpeningHours[] = [];

	hours = '';

	@Output()
	openingDayWithHoursChange: EventEmitter<OpeningHours[]> = new EventEmitter<
		OpeningHours[]
	>();

	openDialog(event: MouseEvent, day: string): void {
		event.preventDefault();
		const _openingHours = this.openingDayWithHours.filter(
			(e) => e.day !== day
		);
		if (_openingHours.length !== this.openingDayWithHours.length) {
			this.openingDayWithHours = [..._openingHours];
			this.hours = this.openingDayWithHours
				.map((e) => e.hours)
				.join(', ');
			this.openingDayWithHoursChange.emit(this.openingDayWithHours);
			return;
		}

		const dialogRef = this.dialog.open(SelectTimeComponent, { data: day });

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.openingDayWithHours = [
					...this.openingDayWithHours,
					result,
				];
				this.hours = this.openingDayWithHours
					.map((e) => e.hours)
					.join(', ');
				this.openingDayWithHoursChange.emit(this.openingDayWithHours);
			}
		});
	}

	openTablesDialog() {
		const dialogRef = this.dialog.open(SelectTablesComponent, {
			data: this.form.get('tables')?.value,
		});

		dialogRef.afterClosed().subscribe((result) => {
			if (result) {
				this.form.get('tables')?.setValue(result);
			}
		});
	}

	get tables(): string {
		return this.form.get('tables')?.value;
	}
}
