import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

import { DatasService } from './datas.service';

import { Router } from '@angular/router';

import { User } from '../_models';

import { deserialize } from 'serializer.ts/Serializer';

import 'rxjs/add/operator/map';

/**
 * User Service
 * 
 * @export
 * @class UserService
 */
@Injectable()
export class UserService extends DatasService {

  /**
   * Creates an instance of UserService.
   * @param {HttpService} http 
   * 
   * @memberOf UserService
   */
  constructor(public http: HttpService) {
    super();
  }

 /**
  * Return all users
  * 
  * @returns 
  * 
  * @memberOf UserService
  */
  all() {
    return this.http.get('/api/users/', true)
      .map(this.extractData)
      .map(res => deserialize<User[]>(User, res))
      .catch(this.handleError);
  }

  /**
   * Get one user
   * 
   * @param {string} id 
   * @returns 
   * 
   * @memberOf UserService
   */
  get(id: string) {
    return this.http.get('/api/users/' + id, true)
      .map(this.extractData)
      .map(res => deserialize<User>(User, res))
      .catch(this.handleError);
  }

  /**
   * Check if user is authenticated on server
   * 
   * @returns 
   * 
   * @memberOf UsersService
   */
  me() {
    return this.http.get('/api/users/me')
      .map(this.extractData)
      .map(res => deserialize<User>(User, res))
      .catch(this.handleError);
  }

  /**
   * Change password of user
   * 
   * @param userId
   * @param passwords
   */
  changePassword(userId, passwords) {
    delete(passwords.confirmNewPassword);
    return this.http.put('/api/users/' + userId + '/password', passwords)
      .map(this.extractData)
      .catch(this.handleError);
  }
}