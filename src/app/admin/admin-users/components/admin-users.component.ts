import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { LoaderService } from '../../../loader/services/loader.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

  public users: Array<User>;

  constructor(private userService: UserService,
              private loaderService: LoaderService) {

  }

  ngOnInit() {
    this.getUsers();
  }

  /**
   * Delete a user
   *
   * @param {User} user
   */
  deleteUser(user: User) {
    this.userService.remove(user)
      .subscribe(() => this.getUsers());
  }

  /**
   * Get all users
   */
  private getUsers() {
    this.loaderService.show();

    this.userService.all()
      .subscribe(users => {
        this.users = users;
        this.loaderService.hide();
      });
  }
}
