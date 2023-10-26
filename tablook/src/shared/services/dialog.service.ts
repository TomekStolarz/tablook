import { Dialog } from '@angular/cdk/dialog';
import { ComponentType } from '@angular/cdk/portal';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private readonly dialog = inject(Dialog);

  openDialog(cmp: ComponentType<unknown>, data: unknown) {
    const dialogRef = this.dialog.open<string>(cmp, {
      data: data,
      autoFocus: 'i'
    });
  }
}
