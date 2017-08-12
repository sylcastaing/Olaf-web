import { Component, ViewEncapsulation } from '@angular/core';

import { MdDialogRef, MdSnackBar } from '@angular/material';

@Component({
  templateUrl: 'confirm.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['confirm.component.css']
})
export class ConfirmDialogComponent {

  public title: string;
  public message: string;

  constructor(public dialogRef: MdDialogRef<ConfirmDialogComponent>) {

  }
}