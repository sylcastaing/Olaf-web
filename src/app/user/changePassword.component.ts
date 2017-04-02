import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';

import { MdDialogRef, MdSnackBar } from '@angular/material';

import { AuthService, UserService } from '../_services/';

@Component({
  templateUrl: 'changePassword.component.html',
  encapsulation: ViewEncapsulation.None
})
export class ChangePasswordComponent {

  public changePasswordForm: FormGroup;
  public oldPassword: AbstractControl;
  public newPassword: AbstractControl;
  public confirmNewPassword: AbstractControl;

  constructor(private dialogRef: MdDialogRef<ChangePasswordComponent>, private userService: UserService, private authService: AuthService, private formBuilder: FormBuilder, private snackBar: MdSnackBar) {
    this.changePasswordForm = formBuilder.group({
      oldPassword: ['', Validators.compose([Validators.required])],
      newPassword: ['', Validators.compose([Validators.required])],
      confirmNewPassword: ['', Validators.compose([Validators.required])]
    }, {
      validator: this.matchingPasswords('newPassword', 'confirmNewPassword')
    });

    this.oldPassword = this.changePasswordForm.controls['oldPassword'];
    this.newPassword = this.changePasswordForm.controls['newPassword'];
    this.confirmNewPassword = this.changePasswordForm.controls['confirmNewPassword'];
  }

  private matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup) => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
       this.confirmNewPassword.setErrors({notEquivalent: true});
      }
    }
  }

  changePassword() {
    let currentUser = this.authService.user;

    this.userService.changePassword(currentUser._id, this.changePasswordForm.value)
      .subscribe(() => {
        this.snackBar.open('Le mot de passe a bien été modifié', 'Fermer');
        this.dialogRef.close();
      },
      () => {
        this.snackBar.open('Le mot de passe actuel saisi n\'est pas correct', 'Fermer');
      })
  }
}