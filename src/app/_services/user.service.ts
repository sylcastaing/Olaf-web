import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

import { DatasService } from './datas.service';

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
    super(http);
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
      .catch(this.handleError);
  }
}