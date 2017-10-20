import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptionsArgs, Response } from '@angular/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class HttpService {

  /**
   * Constructor
   *
   * @param {Http} http
   * @param {Router} router
   * @param {MatSnackBar} snackBar
   */
  constructor(private http: Http,
              private router: Router,
              private snackBar: MatSnackBar) {

  }

  /**
   * Send a get request
   *
   * @param {string} url
   * @param {boolean} intercept
   * @returns {Observable<Response>}
   */
  public get(url: string, intercept?: boolean): Observable<Response> {
    const options = this.getHeader();

    if (intercept) {
      return this.intercept(this.http.get(url, options));
    } else {
      return this.http.get(url, options);
    }
  }

  /**
   * Send a post request
   *
   * @param {string} url
   * @param body
   * @param {boolean} intercept
   * @returns {Observable<Response>}
   */
  public post(url: string, body: any, intercept?: boolean): Observable<Response> {
    const options = this.getHeader();

    if (intercept) {
      return this.intercept(this.http.post(url, body, options));
    } else {
      return this.http.post(url, body, options);
    }
  }

  /**
   * Send a put request
   *
   * @param {string} url
   * @param body
   * @param {boolean} intercept
   * @returns {Observable<Response>}
   */
  public put(url: string, body: any, intercept?: boolean): Observable<Response> {
    const options = this.getHeader();

    if (intercept) {
      return this.intercept(this.http.put(url, body, options));
    } else {
      return this.http.put(url, body, options);
    }
  }

  /**
   * Send a delete request
   *
   * @param {string} url
   * @param {boolean} intercept
   * @returns {Observable<Response>}
   */
  public delete(url: string, intercept?: boolean): Observable<Response> {
    const options = this.getHeader();

    if (intercept) {
      return this.intercept(this.http.delete(url, options));
    } else {
      return this.http.delete(url, options);
    }
  }

  /**
   * Return headers to request
   *
   * @returns {RequestOptionsArgs}
   */
  private getHeader(): RequestOptionsArgs {
    const token = localStorage.getItem('token');

    const options = {
      headers: new Headers()
    };

    options.headers.set('Authorization', 'Bearer ' + token);
    options.headers.set('Content-Type', 'application/json');

    return options;
  }

  /**
   * Intercept http request
   *
   * @param {Observable<Response>} observable
   * @returns {Observable<Response>}
   */
  private intercept(observable: Observable<Response>): Observable<Response> {
    return observable.catch(err => {
      const redirectStatus = [401, 403, 504];

      this.showSnakBar(err.status);

      if (redirectStatus.includes(err.status)) {
        this.router.navigate(['/login']);
      }

      return Observable.throw(err);
    });
  }

  /**
   * Show a snackBar when connection with server failed
   *
   * @param {number} status
   */
  private showSnakBar(status: number) {
    let message: string;

    if (status === 504) {
      message = 'Communication avec le serveur impossible';
    } else if (status === 401 || status === 403) {
      message = 'La session a expirée';
    }

    if (message) {
      this.snackBar.open(message, 'Fermer', {
        duration: 3000,
      });
    }
  }

}
