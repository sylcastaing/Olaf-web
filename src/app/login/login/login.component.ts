import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { LoaderService } from '../../loader/services/loader.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(private authService: AuthService,
              private formBuilder: FormBuilder,
              private router: Router,
              private snackBar: MatSnackBar,
              private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required]
    });

    this.authService.logout();
  }

  login() {
    this.loaderService.show();

    this.authService.login(this.loginForm.value)
      .subscribe(() => {
        this.router.navigate(['/']);
      }, error => {
        this.showError(error);
        this.loaderService.hide();
      }, () => {
        this.loaderService.hide();
      });
  }

  private showError(error: any) {
    const body = JSON.parse(error._body);

    this.snackBar.open((body.message) ? body.message : 'Une erreur technique est survenue', null, {
      duration: 3000
    });
  }
}
