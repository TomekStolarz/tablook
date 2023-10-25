import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './components/search/search.component';
import { SharedModule } from 'src/shared/shared.module';
import { SearchTileComponent } from './components/search-tile/search-tile.component';
import { MatIconModule } from '@angular/material/icon';
import { FilterModule } from 'src/filters-module/filters.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { ElementVisibleDirective } from './directives/element-visible.directive';

@NgModule({
	declarations: [SearchComponent, SearchTileComponent, ElementVisibleDirective],
	imports: [
		CommonModule,
		SharedModule,
		SearchRoutingModule,
		MatIconModule,
		FilterModule,
		MatProgressSpinnerModule,
		MatButtonModule,
	],
	exports: [],
})
export class SearchModule {}
