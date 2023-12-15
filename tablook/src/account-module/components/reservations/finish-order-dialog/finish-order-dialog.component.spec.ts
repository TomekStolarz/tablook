import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FinishOrderDialogComponent } from './finish-order-dialog.component';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';

describe('FinishOrderDialogComponent', () => {
  let component: FinishOrderDialogComponent;
  let fixture: ComponentFixture<FinishOrderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FinishOrderDialogComponent],
      imports: [MatDialogModule],
      providers: [
        {provide: MatDialogRef, useValue: ''},
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FinishOrderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
