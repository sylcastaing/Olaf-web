import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        let user: any = localStorage.getItem('user');
        let activated = false;

        if (user) {
          user = JSON.parse(user);
          activated = user.role === 'admin';
        }

        if (!activated) {
          this.router.navigate(['']);
        }

        return activated;
    }
}