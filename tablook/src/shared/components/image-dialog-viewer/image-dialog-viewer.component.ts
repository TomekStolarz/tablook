import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-image-dialog-viewer',
  templateUrl: './image-dialog-viewer.component.html',
  styleUrls: ['./image-dialog-viewer.component.scss']
})
export class ImageDialogViewerComponent {
  private readonly dialogRef = inject(DialogRef);
  protected image: string = inject(DIALOG_DATA);

  close() {
    this.dialogRef.close();
  }
}
