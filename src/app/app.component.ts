import { Component } from '@angular/core';

import { MdDialog } from '@angular/material';

import { ChangePasswordComponent } from './user/';

import { AuthService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(public authService: AuthService, private dialog: MdDialog) {

  }

  changePassword() {
    this.dialog.open(ChangePasswordComponent);
  }
}
