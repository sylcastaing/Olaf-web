import { Component } from '@angular/core';
import { MdDialog, MdDialogRef } from '@angular/material';

import { UserService, DialogService } from '../../_services';

import { User } from '../../_models';

import { AddUserComponent } from './addUser.component';

@Component({
  moduleId: module.id,
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.css']
})
export class UsersComponent {

  public users: any;

  constructor(private userService: UserService, private dialogService: DialogService, private dialog: MdDialog) {
    this.getUsers();
  } 

  public deleteUser(user: User) {
    this.dialogService
      .confirm('Suppression', 'Etes vous sûr de vouloir supprimer ' + user.name + ' de la liste des utilisateurs ?')
      .subscribe(res => {
        if (res) {
          this.userService.remove(user)
            .subscribe(() => {
              this.getUsers();
            });
        }
      });
  }

  public addUser() {
    this.dialog.open(AddUserComponent)
      .afterClosed()
      .subscribe(res => {
        if (res) {
          this.getUsers();
        }
      });
  }

  private getUsers() {
    this.userService.all()
      .subscribe(users => {
        this.users = users;
      });
  }
}