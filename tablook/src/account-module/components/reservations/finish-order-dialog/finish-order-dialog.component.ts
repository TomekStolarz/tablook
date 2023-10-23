import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-finish-order-dialog',
  templateUrl: './finish-order-dialog.component.html',
  styleUrls: ['./finish-order-dialog.component.scss']
})
export class FinishOrderDialogComponent {
  private dialogRef = inject(MatDialogRef<FinishOrderDialogComponent>);

  reject(): void {
    this.dialogRef.close();
  }
}
