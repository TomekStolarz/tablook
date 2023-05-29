import { NgModule } from '@angular/core';
import { FastFilterComponent } from './components/fast-filter/fast-filter.component';
import { FastFiltersComponent } from './components/fast-filters/fast-filters.component';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './components/filters/filters.component';
import { SharedModule } from 'src/shared/shared.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ControlComponent } from './components/control/control.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

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
		ReactiveFormsModule,
		MatButtonModule,
		MatCheckboxModule,
		FormsModule,
	],
	providers: [],
	exports: [FastFiltersComponent, FiltersComponent],
})
export class FilterModule {}
