import { NgModule } from '@angular/core';
import { FastFilterComponent } from './components/fast-filter/fast-filter.component';
import { FastFiltersComponent } from './components/fast-filters/fast-filters.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ControlComponent } from './components/control/control.component';
import { FiltersComponent } from './components/filters/filters.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
	declarations: [
		FastFilterComponent,
		FastFiltersComponent,
		FiltersComponent,
		ControlComponent,
	],
	imports: [
		CommonModule,
		SharedModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatCheckboxModule,
		FormsModule,
		NgxMatTimepickerModule,
		MatDatepickerModule,
		MatSelectModule,
	],
	providers: [],
	exports: [FastFiltersComponent, FiltersComponent, ControlComponent],
})
export class FilterModule {}
