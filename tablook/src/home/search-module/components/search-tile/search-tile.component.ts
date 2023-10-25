import { Component, Input, OnInit } from '@angular/core';
import { RestaurantSearchInfo } from '../../interfaces/restaurant-search-info.interface';
import { UserInfo } from 'src/app/interfaces/user-info.interface';
import { FavouriteService } from 'src/shared/services/favourite.service';

@Component({
	selector: 'app-search-tile',
	templateUrl: './search-tile.component.html',
})
export class SearchTileComponent implements OnInit {
	@Input()
	restaurantInfo!: RestaurantSearchInfo;

	@Input()
	userInfo?: UserInfo;
	
	protected _isMobile!: boolean;

	@Input()
	set isMobile(isMobile: boolean) {
		this._isMobile = isMobile;
	};

	get isMobile() {
		return this._isMobile;
	}

	protected _isTablet!: boolean;

	@Input()
	set isTablet(isTablet: boolean) {
		this._isTablet = isTablet;
	};

	get isTablet() {
		return this._isTablet;
	}

	constructor(private favService: FavouriteService) {}

	ngOnInit(): void {
		if (this.userInfo?.id && this.restaurantInfo.id) {
			this.favService
				.isRestaurantFavourite(this.userInfo.id, this.restaurantInfo.id)
				.subscribe((x) => {
					this.restaurantInfo.isFavourite = x;
				});
		}
	}
}
