import { Component } from '@angular/core';
import { Tab } from 'src/account-module/models/tab.type';

@Component({
  selector: 'app-restaurant',
  templateUrl: './restaurant.component.html',
  styleUrls: ['./restaurant.component.scss']
})
export class RestaurantComponent {
  protected tabs: Tab[] = [
    { name: 'Reservations in restaurant', route: ''},
    { name: 'Place order', route: 'order'},
  ] 
}
