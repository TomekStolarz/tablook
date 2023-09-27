import { Component, HostListener, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { first, map, switchMap } from 'rxjs';
import { RestaurantFavouriteTile } from 'src/account-module/models/restaurant-favourite-tile';
import { selectUser } from 'src/app/store/user.selector';
import { FavouriteService } from 'src/shared/services/favourite.service';

@Component({
  selector: 'app-fav-tile',
  templateUrl: './fav-tile.component.html',
  styleUrls: ['./fav-tile.component.scss']
})
export class FavTileComponent {
  @Input()
  restaurantInfo!: RestaurantFavouriteTile;
  
  private readonly store = inject(Store);

  private readonly favouriteService = inject(FavouriteService);

  private readonly router = inject(Router);

  @HostListener('click') navigateToFetails() {
    this.router.navigateByUrl(`/home/restaurant/${this.restaurantInfo.id}`);
  }


  handleFavChange(event: MouseEvent) {
    event.stopPropagation();
    this.store.pipe(
      select(selectUser),
      map((user) => user?.id || ''),
      switchMap((id) => {
        if (this.restaurantInfo.isFavourite) {
          return this.favouriteService
            .deleteFavourite(id, this.restaurantInfo?.id);
        } else {
          return this.favouriteService
            .postFavourite(id, this.restaurantInfo?.id);
        }
      }
      ),
      first()
    ).subscribe((x) => {
      if (x) {
        this.restaurantInfo.isFavourite = !this.restaurantInfo.isFavourite;
      }
    });
	}
}
