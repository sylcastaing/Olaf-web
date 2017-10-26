import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AdminGuard implements CanActivate {

  /**
   * Constructor
   *
   * @param {Router} router
   * @param {UserService} userService
   */
  constructor(private router: Router, private userService: UserService) {

  }

  /**
   * Can activate route
   *
   * @param {ActivatedRouteSnapshot} route
   * @param {RouterStateSnapshot} state
   * @returns {any}
   */
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem('token')) {
      return this.userService.me()
        .map((user: User) => {
          return user.isAdmin;
        })
        .catch(() => {
          this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
          return Observable.of(false);
        });
    } else {
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      return false;
    }
  }
}
