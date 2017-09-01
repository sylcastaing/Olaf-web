import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

import { DatasService } from './datas.service';

import { Remote } from '../_models';

import { deserialize } from 'serializer.ts/Serializer';

import 'rxjs/add/operator/map';

/**
 * Remote Service
 * 
 * @export
 * @class RemoteService
 * @extends {DatasService}
 */
@Injectable()
export class RemoteService extends DatasService {

  /**
   * Creates an instance of RemoteService.
   * @param {HttpService} http 
   * @memberof RemoteService
   */
  constructor(private http: HttpService) {
    super();
  }

  /**
   * Get all remotes
   * 
   * @returns 
   * @memberof RemoteService
   */
  public all() {
    return this.http.get('/api/remotes/', null, true)
      .map(this.extractData)
      .map(datas => deserialize<Remote[]>(Remote, datas))
      .catch(this.handleError);
  }

  /**
   * Get remote by id
   * 
   * @param {String} id 
   * @returns 
   * @memberof RemoteService
   */
  public get(id: String) {
    return this.http.get('/api/remotes/'  + id, null, true)
      .map(this.extractData)
      .map(datas => deserialize<Remote>(Remote, datas))
      .catch(this.handleError);
  }

  /**
   * Add a remote
   * 
   * @param {Remote} remote 
   * @returns 
   * @memberof RemoteService
   */
  public add(remote: Remote) {
    return this.http.post('/api/remotes/', remote, null, true)
      .map(this.extractData)
      .map(datas => deserialize<Remote>(Remote, datas))
      .catch(this.handleError);
  }

  /**
   * Modify a remote
   * 
   * @param {Remote} remote 
   * @returns 
   * @memberof RemoteService
   */
  public modify(remote: Remote) {
    return this.http.put('/api/remotes/' + remote._id, remote, null, true)
      .map(this.extractData)
      .map(datas => deserialize<Remote>(Remote, datas))
      .catch(this.handleError);
  }

  /**
   * Delete a remote
   * 
   * @param {String} id 
   * @memberof RemoteService
   */
  public delete(id: String) {
    return this.http.delete('/api/remotes/' + id, null, true)
  }
}

