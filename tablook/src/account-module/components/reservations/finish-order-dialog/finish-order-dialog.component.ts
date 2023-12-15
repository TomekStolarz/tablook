import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { YesNoDialogContext } from './yes-no-dialog-context.model';

@Component({
  selector: 'app-finish-order-dialog',
  templateUrl: './finish-order-dialog.component.html',
  styleUrls: ['./finish-order-dialog.component.scss']
})
export class FinishOrderDialogComponent {
  private dialogRef = inject(MatDialogRef<FinishOrderDialogComponent>);
  protected dialogContext: YesNoDialogContext = inject(MAT_DIALOG_DATA);

  reject(): void {
    this.dialogRef.close();
  }
}
