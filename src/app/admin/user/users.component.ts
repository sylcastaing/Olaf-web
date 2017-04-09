import { Component } from '@angular/core';

import { UserService, DialogService } from '../../_services';

import { User } from '../../_models';

@Component({
  moduleId: module.id,
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.css']
})
export class UsersComponent {

  public users: any;

  constructor(private userService: UserService, private dialogService: DialogService) {
    this.userService.all()
      .subscribe(users => {
        this.users = users;
      });
  }

  public deleteUser(user: User) {
    this.dialogService
      .confirm('Suppression', 'Etes vous sûr de vouloir supprimer ' + user.name + ' de la liste des utilisateurs ?')
      .subscribe(res => {

      });
  }
}