import { TestBed, inject } from '@angular/core/testing';

import { HttpService } from './http.service';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule } from '@angular/material';
import { APP_BASE_HREF } from '@angular/common';

describe('HttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule,
        RouterModule.forRoot([]),
        MatSnackBarModule
      ],
      providers: [
        HttpService,
        {
          provide: APP_BASE_HREF,
          useValue: '/'
        }
      ]
    });
  });

  it('should be created', inject([HttpService], (service: HttpService) => {
    expect(service).toBeTruthy();
  }));
});
