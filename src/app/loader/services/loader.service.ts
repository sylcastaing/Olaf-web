import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Loader } from '../models/loader.model';

@Injectable()
export class LoaderService {

  private _loaderState: Observable<Loader>;
  private _loaderSubject: Subject<Loader>;
  private _loading: boolean;

  /**
   * Constructor
   */
  constructor() {
    this._loading = false;
    this._loaderSubject = new Subject<Loader>();
    this._loaderState = this._loaderSubject.asObservable();
  }

  /**
   * Show the loader
   */
  public show(): void {
    this._loading = true;
    this.sendChange();
  }

  /**
   * Hide the loader
   */
  public hide(): void {
    this._loading = false;
    this.sendChange();
  }

  /**
   * Send changes on observable
   */
  private sendChange(): void {
    this._loaderSubject.next(<Loader>{
      show: this._loading
    });
  }

  /**
   * Getter loaderState
   * @returns {Observable<Loader>}
   */
  get loaderState(): Observable<Loader> {
    return this._loaderState;
  }

  /**
   * Getter loading
   * @returns {boolean}
   */
  get loading(): boolean {
    return this._loading;
  }
}
