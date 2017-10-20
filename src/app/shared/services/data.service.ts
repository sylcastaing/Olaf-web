import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

@Injectable()
export class DataService {

  private socket: any;

  /**
   * Return data from httpResponse
   *
   * @param {Response | any} res
   * @returns {any}
   */
  protected extractData(res: Response | any): any {
    return res.json() || {};
  }

  /**
   * Return error from httpResponse
   *
   * @param {Response | any} error
   * @returns {ErrorObservable}
   */
  protected handleError(error: Response | any) {
    let errMsg: string;

    if (error._body) {
      errMsg = error._body;
    } else {
      errMsg = error.message;
    }

    return Observable.throw({
      status: error.status,
      message: errMsg
    });
  }

  /**
   * Get update from WebSocket
   *
   * @param {string} modelName
   * @param {string} type
   * @returns {Observable<any>}
   */
  public getUpdates(modelName: string, type: string): Observable<any> {
    this.getSocket();

    if (type === undefined || type === null) {
      type = '';
    }

    const observable = new Observable(observer => {
      const socket = this.socket;
      socket.on(modelName + type, (data) => {
        observer.next(data);
      });
      return () => {
        socket.disconnect();
      };
    });

    return observable;
  }

  /**
   * Disconnect from socket
   */
  public closeSocket(): void {
    this.socket.disconnect(0);
    this.socket = null;
  }

  /**
   * Join a socket room
   *
   * @param {string} room
   */
  public joinRoom(room: string): void {
    this.getSocket();
    this.socket.emit('join-' + room);
  }

  /**
   * Leave a socket room
   *
   * @param {string} room
   */
  public leaveRoom(room: string): void {
    this.getSocket();
    this.socket.emit('leave-' + room);
  }

  /**
   * Create socket
   */
  private getSocket(): void {
    if (this.socket === undefined || this.socket === null) {
      this.socket = io('', {
        query: 'token=' + localStorage.getItem('token')
      });
    }
  }
}
