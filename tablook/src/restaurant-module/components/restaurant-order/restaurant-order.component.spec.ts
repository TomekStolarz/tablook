import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantOrderComponent } from './restaurant-order.component';
import { provideMockStore } from '@ngrx/store/testing';
import { RestaurantDetailsService } from 'src/home/restaurant-details/services/restaurant-details.service';
import { Dialog } from '@angular/cdk/dialog';

describe('RestaurantOrderComponent', () => {
  let component: RestaurantOrderComponent;
  let fixture: ComponentFixture<RestaurantOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantOrderComponent],
      providers: [provideMockStore({}),
        { provide: RestaurantDetailsService, useValue: '' },
        { provide: Dialog, useValue: '' }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
