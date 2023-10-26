import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageDialogViewerComponent } from './image-dialog-viewer.component';

describe('ImageDialogViewerComponent', () => {
  let component: ImageDialogViewerComponent;
  let fixture: ComponentFixture<ImageDialogViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageDialogViewerComponent ]
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
