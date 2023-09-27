import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavTileComponent } from './fav-tile.component';

describe('FavTileComponent', () => {
  let component: FavTileComponent;
  let fixture: ComponentFixture<FavTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FavTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FavTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
