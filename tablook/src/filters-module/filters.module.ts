import { NgModule } from '@angular/core';
import { FastFilterComponent } from './components/fast-filter/fast-filter.component';
import { FastFiltersComponent } from './components/fast-filters/fast-filters.component';
import { CommonModule } from '@angular/common';

@NgModule({
	declarations: [FastFilterComponent, FastFiltersComponent],
	imports: [CommonModule],
	providers: [],
	exports: [FastFiltersComponent],
})
export class FilterModule {}
