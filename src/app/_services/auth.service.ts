import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

import { UserService } from './user.service';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  private _user: any = null;

  constructor(public http: HttpService, public userService: UserService) {
    this.loadUser();
  }

  login(credentials) {
    return this.http.post('/auth/local', credentials)
      .map((res) => {
        let token = res.json();

        if (token && token.token) {
          localStorage.setItem('token', token.token);
          this.loadUser();
        }
      });
  }

  logout() {
    this._user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  private loadUser() {
    this.userService.me()
      .subscribe(res => {
        localStorage.setItem('user', JSON.stringify(res));
        this._user = res;
      });
  }

  get user(): any {
    return this._user
  }

  isAuthenticated() : boolean {
    return this._user !== null;
  }

  isAdmin() : boolean {
    return this._user !== null && this._user.role === 'admin';
  }
}