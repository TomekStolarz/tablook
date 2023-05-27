import { NgModule } from '@angular/core';
import { FastFilterComponent } from './components/fast-filter/fast-filter.component';
import { FastFiltersComponent } from './components/fast-filters/fast-filters.component';

@NgModule({
	declarations: [FastFilterComponent, FastFiltersComponent],
	imports: [],
	providers: [],
	exports: [FastFiltersComponent],
})
export class FilterModule {}
