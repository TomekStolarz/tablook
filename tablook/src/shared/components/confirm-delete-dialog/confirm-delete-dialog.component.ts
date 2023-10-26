import { Component, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FinishOrderDialogComponent } from 'src/account-module/components/reservations/finish-order-dialog/finish-order-dialog.component';

@Component({
  selector: 'app-confirm-delete-dialog',
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrls: ['./confirm-delete-dialog.component.scss']
})
export class ConfirmDeleteDialogComponent {
  private dialogRef = inject(MatDialogRef<FinishOrderDialogComponent>);

  reject(): void {
    this.dialogRef.close();
  }
}
