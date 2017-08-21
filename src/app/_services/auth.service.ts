import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

import { UserService } from './user.service';

import { User } from '../_models';

import 'rxjs/add/operator/map';

/**
 * Authentification service
 * 
 * @export
 * @class AuthService
 */
@Injectable()
export class AuthService {

  /**
   * Current user
   * 
   * @private
   * @type {User}
   * @memberof AuthService
   */
  private _user: User = null;

  /**
   * Creates an instance of AuthService.
   * @param {HttpService} http 
   * @param {UserService} userService 
   * @memberof AuthService
   */
  constructor(public http: HttpService, public userService: UserService) {
    this.loadUser();
  }

  /**
   * Login
   * 
   * @param {any} credentials 
   * @returns 
   * @memberof AuthService
   */
  public login(credentials) {
    return this.http.post('/auth/local', credentials)
      .map((res) => {
        let token = res.json();

        if (token && token.token) {
          localStorage.setItem('token', token.token);
          this.loadUser();
        }
      });
  }

  /**
   * Logout
   * 
   * @memberof AuthService
   */
  public logout() {
    this._user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /**
   * Load user from server
   * 
   * @private
   * @memberof AuthService
   */
  private loadUser() {
    this.userService.me()
      .subscribe(res => {
        localStorage.setItem('user', JSON.stringify(res));
        this._user = res;
      });
  }

  /**
   * Return current user
   * 
   * @readonly
   * @type {*}
   * @memberof AuthService
   */
  get user(): any {
    return this._user
  }

  /**
   * Return true if user is authenticated
   * 
   * @returns {boolean} 
   * @memberof AuthService
   */
  public isAuthenticated() : boolean {
    return this._user !== null;
  }

  /**
   * Return true if user is admin
   * 
   * @returns {boolean} 
   * @memberof AuthService
   */
  public isAdmin() : boolean {
    return this._user !== null && this._user.isAdmin;
  }
}