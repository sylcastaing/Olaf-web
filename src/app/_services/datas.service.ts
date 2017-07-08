import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Injectable } from '@angular/core';

import { Router } from '@angular/router';

import * as io from 'socket.io-client';

import 'rxjs/add/observable/throw'

/**
 * DatasService
 * 
 * @export
 *
 * @class DatasService
 */
@Injectable()
export class DatasService {

  private socket: any;

  constructor() {
    
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

    if (error._body) {
      errMsg = error._body;
    }
    else {
      errMsg = error.message;
    }

    let retour = {
      status: error.status,
      message: errMsg
    }

    return Observable.throw(retour);
  }

  public getUpdates(modelName: string, type: string) : Observable<any> {
    if (this.socket === undefined || this.socket === null) {
      this.socket = io('', {
        ws: true,
        query: 'token=' + localStorage.getItem('token')
      });
    }

    let observable = new Observable(observer => {
      var socket = this.socket;
      socket.on(modelName + type, (data) => {
        observer.next(data);
      });
      return () => {
        socket.disconnect();
      };
    });
    
    return observable;
  }

  public closeSocket() : void {
    this.socket.disconnect(0);
    this.socket = null;
  } 
}