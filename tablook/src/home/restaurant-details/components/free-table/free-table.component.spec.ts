import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeTableComponent } from './free-table.component';

describe('FreeTableComponent', () => {
  let component: FreeTableComponent;
  let fixture: ComponentFixture<FreeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FreeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
