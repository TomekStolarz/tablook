import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDialogViewerComponent } from './image-dialog-viewer.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { MatIconModule } from '@angular/material/icon';

describe('ImageDialogViewerComponent', () => {
  let component: ImageDialogViewerComponent;
  let fixture: ComponentFixture<ImageDialogViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageDialogViewerComponent],
      imports: [MatDialogModule, MatIconModule],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        { provide: MAT_DIALOG_DATA, useValue: [] },
        { provide: DialogRef, useValue: [] },
        { provide: DIALOG_DATA, useValue: [] },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImageDialogViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
