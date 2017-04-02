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
 * @abstract
 * @class DatasService
 */
export abstract class DatasService {

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