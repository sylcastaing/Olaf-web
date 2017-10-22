import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { HttpService } from './http.service';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { MatSnackBarModule } from '@angular/material';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        MatSnackBarModule,
        RouterModule.forRoot([])
      ],
      providers: [
        AuthService,
        HttpService,
        UserService,
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        }
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  describe('isAuthenticated', () => {

    it('with undefined user on start', inject([AuthService], (service: AuthService) => {
      expect(service.isAuthenticated()).toBe(false);
    }));
  });
});
