import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../_services/user.service';
import { User } from '../_models';

import 'rxjs/add/observable/of';

/**
 * Protect Admin routes
 * 
 * @export
 * @class AdminGuard
 * @implements {CanActivate}
 */
@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private router: Router, private userService: UserService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (localStorage.getItem('token')) {
        return this.userService.me()
          .map((user: User) => {
              return user.isAdmin;
          })
          .catch(() => {
              this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
              return Observable.of(false);
          });
      }
      else {
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
      }
    }
}