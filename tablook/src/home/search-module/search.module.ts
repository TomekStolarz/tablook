import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchRoutingModule } from './search-routing.module';
import { SearchComponent } from './components/search/search.component';
import { SharedModule } from 'src/shared/shared.module';
import { SearchTileComponent } from './components/search-tile/search-tile.component';
import { MatIconModule } from '@angular/material/icon';
import { FilterModule } from 'src/filters-module/filters.module';

@NgModule({
	declarations: [SearchComponent, SearchTileComponent],
	imports: [
		CommonModule,
		SharedModule,
		SearchRoutingModule,
		MatIconModule,
		FilterModule,
	],
	exports: [],
})
export class SearchModule {}
