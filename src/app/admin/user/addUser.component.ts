import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialogRef, MdSnackBar } from '@angular/material';

import { UserService } from '../../_services';
import { User } from '../../_models';

import { LoaderService } from '../../loader';

@Component({
  templateUrl: 'addUser.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['users.component.css']
})
export class AddUserComponent {

  public user: User;
  public userForm: FormGroup;

  constructor(private dialogRef: MdDialogRef<AddUserComponent>, public userService: UserService, public formBuilder: FormBuilder, public loaderService: LoaderService) {
    this.user = new User();

    this.userForm = formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required],
      role: ['user']
    });
  }

  public save() {
    this.loaderService.show();
    this.userService.add(this.userForm.value)
      .subscribe(user => {
        this.loaderService.hide();
        this.dialogRef.close(true)
      },
      error => {
        this.loaderService.hide();
        console.error(error);
      });
  }
}