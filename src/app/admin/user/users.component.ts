import { Component } from '@angular/core';

import { UserService } from '../../_services/';

@Component({
  moduleId: module.id,
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.css']
})
export class UsersComponent {

  public users: any;

  constructor(private userService: UserService) {
    this.userService.all()
      .subscribe(users => {
        this.users = users;
      });
  }
}