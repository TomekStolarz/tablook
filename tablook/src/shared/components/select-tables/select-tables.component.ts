import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Table } from 'src/shared/interfaces/table.interface';

@Component({
	selector: 'app-select-tables',
	templateUrl: './select-tables.component.html',
})
export class SelectTablesComponent {
	constructor(
		public dialogRef: MatDialogRef<SelectTablesComponent>,
		@Inject(MAT_DIALOG_DATA) public tables: string,
		private fb: FormBuilder
	) {
		this._defaultTables = tables ? JSON.parse(tables) : [];
		this._tablesCopy = [...this._defaultTables];
	}

	_tablesCopy!: Table[];
	_defaultTables!: Table[];

	tableForm: FormGroup = this.fb.group({
		id: ['', [Validators.required]],
		seats: [
			'',
			[
				Validators.required,
				Validators.min(1),
				Validators.pattern(/\d{0,}/),
			],
		],
	});

	add() {
		if (this.tableForm.invalid) {
			this.tableForm.markAllAsTouched();
			return;
		}

		if (
			this._tablesCopy.findIndex(
				(e) => e.id === this.tableForm.get('id')?.value
			) !== -1
		) {
			return;
		}

		this._tablesCopy.push(this.tableForm.getRawValue());
		this.tableForm.reset();
		this.tableForm.get('id')?.setErrors(null);
		this.tableForm.get('seats')?.setErrors(null);
	}

	remove(id: string) {
		const deleteIndex = this._tablesCopy.findIndex((e) => e.id === id);
		this._tablesCopy.splice(deleteIndex, 1);
	}

	cancel(): void {
		this.dialogRef.close(JSON.stringify(this._defaultTables));
	}

	save(): void {
		if (!this._tablesCopy.length) {
			return;
		}
		this.dialogRef.close(JSON.stringify(this._tablesCopy));
	}
}
