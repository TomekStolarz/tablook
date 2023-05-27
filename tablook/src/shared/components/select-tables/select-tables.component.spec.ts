import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTablesComponent } from './select-tables.component';

describe('SelectTablesComponent', () => {
  let component: SelectTablesComponent;
  let fixture: ComponentFixture<SelectTablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectTablesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
