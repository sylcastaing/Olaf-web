import { Injectable } from '@angular/core';
import { Http, Headers, ConnectionBackend, Request, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

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
  constructor(public backend: ConnectionBackend, public defaultOptions: RequestOptions) {
    super(backend, defaultOptions);
  }

  request(url: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    if (typeof url === 'string') {
      if (!options) {
        options = {headers: new Headers()};
      }
      options.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }
    else {
       url.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'));
    }

    return super.request(url, options);
  }
}