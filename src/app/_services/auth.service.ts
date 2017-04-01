import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

import { UserService } from './user.service';

import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {

  constructor(public http: HttpService, public userService: UserService) {

  }

  login(credentials) {
    return this.http.post('/auth/local', credentials)
      .map((res) => {
        let token = res.json();

        if (token && token.token) {
          localStorage.setItem('token', token.token);
        }
      });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}