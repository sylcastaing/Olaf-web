import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { MdSnackBar } from '@angular/material';

import { AuthService, UserService } from '../_services/';

import { LoaderService } from '../loader';

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  public returnUrl: String; 

  constructor(public authService: AuthService, public userService: UserService, public formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute, public snackBar: MdSnackBar, public loaderService: LoaderService) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.email, Validators.required])],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loaderService.show();
    this.authService.login(this.loginForm.value)
      .subscribe(
        () => {
          this.loaderService.hide();
          this.router.navigate(['/']);
        },
        error => {
          this.loaderService.hide();
          this.showError(error);
        }
      )
  }

  private showError(error: any) {
    var body = JSON.parse(error._body);
    var message = "Une erreur technique est survenue";

    if (body.message !== undefined) {
      message = body.message;
    }

    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
    });
  }
}