import { Component, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { RestaurantFavouriteTile } from 'src/account-module/models/restaurant-favourite-tile';
import { selectUser } from 'src/app/store/user.selector';
import { RestaurantDetailsService } from 'src/home/restaurant-details/services/restaurant-details.service';
import { FavouriteService } from 'src/shared/services/favourite.service';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.scss']
})
export class FavouritesComponent {
  private readonly favService = inject(FavouriteService);

  private readonly store = inject(Store);

  protected favouriteData$: Observable<RestaurantFavouriteTile[]> = this.store.pipe(
    select(selectUser),
    map((userInfo) => userInfo?.id || ''),
    switchMap((userId) => this.favService.getFavourites(userId)),
  ); 
}
