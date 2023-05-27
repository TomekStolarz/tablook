import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FastFiltersComponent } from './fast-filters.component';

describe('FastFiltersComponent', () => {
  let component: FastFiltersComponent;
  let fixture: ComponentFixture<FastFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FastFiltersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FastFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
