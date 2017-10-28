import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpService } from './http.service';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UserService extends DataService {

  /**
   * Constructor
   *
   * @param {HttpService} http
   */
  constructor(private http: HttpService) {
    super();
  }

  /**
   * Return all user
   *
   * @returns {Observable<Array<User>>}
   */
  public all(): Observable<Array<User>> {
    return this.http.get('/api/users/', true)
      .map(this.extractData)
      .map(datas => datas.map(data => new User(data)))
      .catch(this.handleError);
  }

  /**
   * Get user by id
   *
   * @param {string} id
   * @returns {Observable<User>}
   */
  public get(id: string): Observable<User> {
    return this.http.get('/api/users/' + id, true)
      .map(this.extractData)
      .map(data => new User(data))
      .catch(this.handleError);
  }

  /**
   * Crate a new user
   *
   * @param user
   * @returns {Observable<User>}
   */
  public add(user): Observable<User> {
    return this.http.post('/api/users', user, true)
      .map(this.extractData)
      .map(data => new User(data))
      .catch(this.handleError);
  }

  /**
   * Remove a user
   *
   * @param {User} user
   * @returns {Observable<any>}
   */
  public remove(user: User): Observable<any> {
    return this.http.delete('/api/users/' + user._id, true)
      .catch(this.handleError);
  }

  /**
   * Return the current user
   *
   * @returns {Observable<User>}
   */
  public me(): Observable<User> {
    return this.http.get('/api/users/me')
      .map(this.extractData)
      .map(data => new User(data))
      .catch(this.handleError);
  }

  /**
   * Change the password
   *
   * @param userId
   * @param passwords
   * @returns {Observable<any>}
   */
  public changePassword(userId, passwords): Observable<any> {
    delete(passwords.confirmNewPassword);
    return this.http.put('/api/users/' + userId + '/password', passwords)
      .map(this.extractData)
      .catch(this.handleError);
  }

}
