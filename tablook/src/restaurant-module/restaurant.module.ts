import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/shared/shared.module";
import { RestaurantRouterModule } from "./restaurant-routing.module";
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { AccountModule } from "src/account-module/account.module";
import { RestaurantOrderComponent } from './components/restaurant-order/restaurant-order.component';
import { OrderComponent } from "src/home/restaurant-details/components/order/order.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { NgImageSliderModule } from "ng-image-slider";
import { MatDialogModule } from "@angular/material/dialog";
import { SettingComponent } from './components/setting/setting.component';

@NgModule({
    imports: [
      CommonModule,
      SharedModule,
      RestaurantRouterModule,
      AccountModule,
      OrderComponent,
      MatFormFieldModule,
      ReactiveFormsModule,
      MatInputModule,
      NgImageSliderModule,
      MatDialogModule
    ],
    declarations: [
      RestaurantComponent,
      RestaurantOrderComponent,
      SettingComponent
    ],
})
export class RestaurantModule { }