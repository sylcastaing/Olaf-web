import { TestBed, inject } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { HttpService } from './http.service';
import { BaseRequestOptions, Http, Response, ResponseOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { MatSnackBarModule } from '@angular/material';
import { MockBackend, MockConnection } from '@angular/http/testing';

describe('AuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        MatSnackBarModule,
        RouterModule.forRoot([])
      ],
      providers: [
        AuthService,
        HttpService,
        UserService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        },
        {
          provide: Http,
          useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          },
          deps: [MockBackend, BaseRequestOptions],
        },
      ]
    });
  });

  it('should be created', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  describe('isAuthenticated', () => {

    it ('Test login',  inject([AuthService, MockBackend], (service: AuthService, backend: MockBackend) => {
      expect(service.isAuthenticated()).toBe(false);
      expect(service.user).toBe(null);

      backend.connections.subscribe((c: MockConnection) => c.mockRespond(new Response(new ResponseOptions({
        body: JSON.stringify({
          _id: 'azeazeeaz',
          name: 'test',
          email: 'test@test.com',
          role: 'admin'
        })
      }))));

      return service.login({
        email: 'test@test.com',
        password: 'azerty'
      }).subscribe(() => {
        expect(service.isAuthenticated()).toBe(true);
      });


    }));
  });
});
