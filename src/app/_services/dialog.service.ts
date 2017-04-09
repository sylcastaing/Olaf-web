import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { ConfirmDialogComponent } from '../dialog/';

@Injectable()
export class DialogService {

  constructor(private dialog: MdDialog) {

  }

  public confirm(title: string, message: string): Observable<boolean> {

    let dialogRef: MdDialogRef<ConfirmDialogComponent>;

    dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }
}