import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantDetailsComponent } from './restaurant-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RestaurantDetailsService } from '../../services/restaurant-details.service';
import { provideMockStore } from '@ngrx/store/testing';
import { FavouriteService } from 'src/shared/services/favourite.service';
import { DialogService } from 'src/shared/services/dialog.service';

describe('RestaurantDetailsComponent', () => {
  let component: RestaurantDetailsComponent;
  let fixture: ComponentFixture<RestaurantDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RestaurantDetailsComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [{ provide: RestaurantDetailsService, useValue: '' },
        provideMockStore(),
        { provide: FavouriteService, useValue: '' },
        { provide: DialogService, useValue: '' },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestaurantDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
