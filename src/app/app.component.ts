import { Component } from '@angular/core';

import { MdDialog } from '@angular/material';

import { ChangePasswordComponent } from './user/';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  constructor(public dialog: MdDialog) {

  }

  isAuthenticated() {
    return (localStorage.getItem('token') !== null);
  }

  isAdmin() {
    var isAdmin = false;
    var user = localStorage.getItem('user');

    if (user !== null) {
      isAdmin = (JSON.parse(user).role === 'admin');
    }

    return isAdmin;
  }

  changePassword() {
    this.dialog.open(ChangePasswordComponent);
  }
}
