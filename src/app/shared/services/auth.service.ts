import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpService } from './http.service';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {

  private _user: User;

  /**
   * Constructor
   *
   * @param {HttpService} http
   * @param {UserService} userService
   */
  constructor(public http: HttpService,
              public userService: UserService) {

    this._user = null;
    this.loadUser();
  }

  /**
   * Login function
   *
   * @param credentials
   * @returns {Observable<any>}
   */
  public login(credentials): Observable<any> {
    return this.http.post('/auth/local', credentials)
      .map((res) => {
        const token = res.json();

        if (token && token.token) {
          localStorage.setItem('token', token.token);
          this.loadUser();
        }
      });
  }

  /**
   * Logout
   */
  public logout() {
    this._user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  /**
   * Load current user
   */
  private loadUser() {
    this.userService.me()
      .subscribe(res => {
        localStorage.setItem('user', JSON.stringify(res));
        this._user = res;
      });
  }

  /**
   * Getter user
   *
   * @returns {User}
   */
  get user(): User {
    return this._user;
  }

  /**
   * Return true is user is authenticated
   *
   * @returns {boolean}
   */
  public isAuthenticated(): boolean {
    return this._user !== null;
  }

  /**
   * Return true is user is admin
   *
   * @returns {boolean}
   */
  public isAdmin(): boolean {
    return this._user !== null && this._user.isAdmin;
  }
}
