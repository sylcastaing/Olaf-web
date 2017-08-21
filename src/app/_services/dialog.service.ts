import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { ConfirmDialogComponent } from '../dialog/';

/**
 * Helper for dialog
 * 
 * @export
 * @class DialogService
 */
@Injectable()
export class DialogService {

  /**
   * Creates an instance of DialogService.
   * @param {MdDialog} dialog 
   * @memberof DialogService
   */
  constructor(private dialog: MdDialog) {

  }

  /**
   * Create a confirm dialog
   * 
   * @param {string} title 
   * @param {string} message 
   * @returns {Observable<boolean>} 
   * @memberof DialogService
   */
  public confirm(title: string, message: string): Observable<boolean> {

    let dialogRef: MdDialogRef<ConfirmDialogComponent>;

    dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.componentInstance.title = title;
    dialogRef.componentInstance.message = message;

    return dialogRef.afterClosed();
  }
}