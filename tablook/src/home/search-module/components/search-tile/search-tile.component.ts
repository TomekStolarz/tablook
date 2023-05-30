import { Component, Input } from '@angular/core';
import { RestaurantSearchInfo } from '../../interfaces/restaurant-search-info.interface';

@Component({
	selector: 'app-search-tile',
	templateUrl: './search-tile.component.html',
})
export class SearchTileComponent {
	@Input()
	restaurantInfo!: RestaurantSearchInfo;
}
