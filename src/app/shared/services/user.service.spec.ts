import { TestBed, inject } from '@angular/core/testing';

import { UserService } from './user.service';
import { DataService } from './data.service';
import { HttpService } from './http.service';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { MatSnackBarModule } from '@angular/material';

describe('UserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterModule.forRoot([]),
        MatSnackBarModule
      ],
      providers: [
        UserService,
        DataService,
        HttpService,
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        }
      ]
    });
  });

  it('should be created', inject([UserService], (service: UserService) => {
    expect(service).toBeTruthy();
  }));
});
