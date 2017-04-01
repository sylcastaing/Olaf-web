import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { HttpService } from './http.service';

import * as io from 'socket.io-client';

/**
 * Custom Service Class
 * 
 * @export
 * @abstract
 * @class AuthService
 */
export abstract class DatasService {

  /**
   * Creates an instance of UserService.
   * @param {HttpService} http 
   * 
   * @memberOf UserService
   */
  constructor(public http: HttpService) {

  }

   /**
   * Return datas
   * 
   * @protected
   * @param {Response} res 
   * @returns {*} 
   * 
   * @memberOf DatasService
   */
  protected extractData(res: Response) : any {
    return res.json() || {};
  }

  /**
   * Return errors
   * 
   * @protected
   * @param {(Response | any)} error 
   * @returns 
   * 
   * @memberOf DatasService
   */
  protected handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    return Observable.throw(errMsg);
  }

  public getUpdates(modelName: String) : Observable<any> {
    let observable = new Observable(observer => {
      var socket = this.socket;
      socket.on(modelName + ':save', (data) => {
        observer.next(data);
      });
      return () => {
        socket.disconnect();
      };
    });
    
    return observable;
  }

  get socket(): any {
    return io('', {
      ws: true,
      query: 'token=' + localStorage.getItem('token')
    })
  }
}