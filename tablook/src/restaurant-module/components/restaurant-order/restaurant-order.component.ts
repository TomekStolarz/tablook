import { Dialog } from '@angular/cdk/dialog';
import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Observable, BehaviorSubject, Subscription, map, switchMap } from 'rxjs';
import { RestaurantInfo } from 'src/app/interfaces/restaurant-info.interface';
import { selectUser } from 'src/app/store/user.selector';
import { RestaurantDetailsService } from 'src/home/restaurant-details/services/restaurant-details.service';
import { ImageDialogViewerComponent } from 'src/shared/components/image-dialog-viewer/image-dialog-viewer.component';
import { DialogService } from 'src/shared/services/dialog.service';

@Component({
  selector: 'app-restaurant-order',
  templateUrl: './restaurant-order.component.html'
})
export class RestaurantOrderComponent implements OnInit, OnDestroy {
  private readonly store = inject(Store);

  private readonly restaurantDetailsService = inject(RestaurantDetailsService);

  private readonly fb = inject(FormBuilder);

  private readonly dialogService = inject(DialogService);

  protected name = new BehaviorSubject<string>('');
  
  protected phone = new BehaviorSubject<string>('');

  protected guestClientForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    phone: ['', Validators.required]
  })

  protected readonly restaurant: Observable<RestaurantInfo> = this.store.pipe(
    select(selectUser),
    map((user) => user?.id || ''),
    switchMap((id) => this.restaurantDetailsService.getRestaurantOrderDetails(id))
  );

  private subscriptions: Subscription[] = []

  ngOnInit(): void {
    this.subscriptions.push(
      this.guestClientForm.valueChanges.subscribe((values) => {
        if (values.name) {
          this.name.next(values.name);
        }

        if (values.phone) {
          this.phone.next(values.phone);
        }
      })
    )
  }

  openImageDialog(image?: string) {
    this.dialogService.openDialog(ImageDialogViewerComponent, image);
  }

  reserveClick() {
    this.guestClientForm.markAllAsTouched();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((x) => x.unsubscribe());
  }
}
