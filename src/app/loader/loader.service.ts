import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Loader } from './loader';

@Injectable()
export class LoaderService {

  public loaderState: Observable<Loader>;

  private loaderSubject: Subject<Loader>;
  private _loading: Boolean;

  constructor() {
    this._loading = false;
    this.loaderSubject = new Subject<Loader>();
    this.loaderState = this.loaderSubject.asObservable();
  }

  public show(): void {
    this._loading = true;
    this.sendChange();
  }

  public hide(): void {
    this._loading = false;
    this.sendChange();
  }

  private sendChange(): void {
    this.loaderSubject.next(<Loader>{
      show: this._loading
    });
  }

  get loading(): Boolean {
    return this._loading;
  }
}