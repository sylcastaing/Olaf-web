import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoaderService } from '../../../../loader/services/loader.service';
import { User } from '../../../../shared/models/user.model';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {

  private userId: string;
  private user: User;

  public userForm: FormGroup;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private loaderService: LoaderService) {
  }

  ngOnInit() {
    this.loaderService.show();
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      this.loadComponent();
    });
  }


  save() {
    this.loaderService.show();
    if (this.isNewUser()) {
      this.userService.add(this.userForm.value)
        .subscribe(() => {
          this.loaderService.hide();
          this.goBack();
        }, () => {
          this.loaderService.hide();
        });
    } else {
      // TODO
    }
  }

  /**
   * Return true is user is a new user
   *
   * @returns {boolean}
   */
  isNewUser(): boolean {
    return this.userId === 'new';
  }


  /**
   * Load user
   */
  private loadComponent() {
    if (this.isNewUser()) {
      this.user = new User();
      this.loadForm();
    } else {
      this.userService.get(this.userId)
        .subscribe(user => {
          this.user = user;
          this.loadForm();
        });
    }
  }

  /**
   * Load the form
   */
  private loadForm() {
    if (this.user) {
      this.userForm = this.formBuilder.group({
        name: [this.user.name, Validators.required],
        email: [this.user.email, Validators.compose([Validators.email, Validators.required])],
        password: [this.user.password, Validators.required],
        role: [this.user.role]
      });
    }
    this.loaderService.hide();
  }

  /**
   * Return to users page
   */
  private goBack() {
    this.router.navigate(['/admin/users/']);
  }
}
