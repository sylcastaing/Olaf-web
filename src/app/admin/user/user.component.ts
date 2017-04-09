import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../../_services/';

@Component({
  moduleId: module.id,
  templateUrl: 'user.component.html'
})
export class UserComponent implements OnInit, OnDestroy {

  public user: any;
  private sub: any;

  constructor(private userService: UserService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.userService.get(params['id'])
        .subscribe(user => {
          this.user = user;
        });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}