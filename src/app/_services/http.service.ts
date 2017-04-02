import { Injectable } from '@angular/core';
import { Http, Headers, ConnectionBackend, Request, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Router } from '@angular/router';

import { MdSnackBar } from '@angular/material';

import 'rxjs/add/operator/map';

@Injectable()
export class HttpService extends Http {
  /**
   * Creates an instance of HttpService.
   * @param {ConnectionBackend} backend 
   * @param {RequestOptions} defaultOptions 
   * @param {Storage} storage 
   * 
   * @memberOf HttpService
   */
  constructor(public backend: ConnectionBackend, public defaultOptions: RequestOptions, private router: Router, private snackBar: MdSnackBar) {
    super(backend, defaultOptions);
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    if (typeof url === 'string') {
      if (!options) {
        options = {headers: new Headers()};
      }
      options.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
      options.headers.set('Content-Type', 'application/json');
    }
    else {
       url.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
       url.headers.set('Content-Type', 'application/json');
    }

    return super.request(url, options);
  }

  get(url: string, intercept?: boolean, options?: RequestOptionsArgs): Observable<Response> {
    if (intercept) {
      return this.intercept(super.get(url, options));
    }
    else {
      return super.get(url, options);
    }
  }

  post(url: string, body: any, intercept?: boolean, options?: RequestOptionsArgs): Observable<Response> {
    if (!options) {
      options = {headers: new Headers()};
    }
    options.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));

    if (intercept) {
      return this.intercept(super.post(url, body, options));
    }
    else {
      return super.post(url, body, options)
    }
  };

  put(url: string, body: any, intercept?: boolean, options?: RequestOptionsArgs): Observable<Response> {
    if (!options) {
      options = {headers: new Headers()};
    }
    options.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));

    if (intercept) {
      return this.intercept(super.put(url, body, options));
    }
    else {
      return super.put(url, body, options)
    }
  };

  private intercept(observable: Observable<Response>) : Observable<Response> {
    return observable.catch(err => {
      let redirectStatus = [401, 403, 504];

      this.showSnakBar(err.status);

      if (redirectStatus.includes(err.status)) {
        this.router.navigate(['/login']);
      }

      return Observable.throw(err);
    });
  }

  private showSnakBar(status: number) {
    let message: string;
    
    if (status === 504) {
      message = 'Communication avec le serveur impossible';
    }
    else if (status === 401 || status === 403) {
      message = 'La session a expirée';
    }

    if (message) {
        this.snackBar.open(message, 'Fermer', {
          duration: 3000,
        });
    }
  }
}