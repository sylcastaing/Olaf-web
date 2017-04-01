import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { MdSnackBar } from '@angular/material';

import { AuthService, UserService } from '../_services/';

@Component({
  moduleId: module.id,
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  public loading: Boolean = false;
  public returnUrl: String; 

  constructor(public authService: AuthService, public userService: UserService, public formBuilder: FormBuilder, public router: Router, private route: ActivatedRoute, public snackBar: MdSnackBar) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.pattern('^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$'), Validators.required])],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.authService.logout();

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

  login() {
    this.loading = true;
    this.authService.login(this.loginForm.value)
      .subscribe(
        () => {
          this.loadUser();
        },
        error => {
          this.loading = false;
          this.showError(error);
        }
      )
  }

  private loadUser() {
    this.userService.me()
      .subscribe(res => {
        localStorage.setItem('user', JSON.stringify(res));
        this.router.navigate([this.returnUrl]);
      });
  }

  private showError(error: any) {
    var body = JSON.parse(error._body);
    var message = "Une erreur technique est survenue";

    if (body.message !== undefined) {
      message = body.message;
    }

    this.snackBar.open(message, 'Fermer', {
      duration: 3000,
    })
  }
}