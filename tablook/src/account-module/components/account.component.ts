import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Tab } from '../models/tab.type';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AccountComponent {
  protected tabs: Tab[] = [
    { name: 'Settings', route: 'settings'},
    { name: 'My reservations', route: 'reservations'},
    { name: 'Favourites', route: 'favourites'},
    { name: 'Contact', route: 'contact'},
  ] 
}
