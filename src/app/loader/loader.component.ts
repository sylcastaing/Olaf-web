import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { LoaderService } from './loader.service';
import { Loader } from './loader';

@Component({
  selector: 'olaf-loader',
  template: '<md-progress-bar mode="indeterminate" *ngIf="show"></md-progress-bar><div class="olaf-progress-bar-hidden" *ngIf="!show"></div>',
  styleUrls: ['loader.component.scss']
})
export class LoaderComponent implements OnInit {

  public show: Boolean;
  private subscription: Subscription;

  constructor(private loaderService: LoaderService) {
    this.show = false;
  }

  ngOnInit() { 
    this.subscription = this.loaderService.loaderState
      .subscribe((state: Loader) => {
        this.show = state.show;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}