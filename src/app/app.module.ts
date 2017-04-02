import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XHRBackend, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { MaterialModule, MdSnackBar } from '@angular/material';
import { ChartModule } from 'angular2-highcharts';

import { AuthService, HttpService, WeatherService, UserService } from './_services';

import { AuthGuard } from './_guards';

import { WeatherComponent } from './weather';
import { LoginComponent } from './login';
import { ChangePasswordComponent } from './user';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    LoginComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    routing,
    ChartModule.forRoot(require('highcharts'))
  ],
  providers: [
    AuthGuard,
    AuthService,
    WeatherService,
    UserService,
    {
      provide: HttpService,
      useFactory: (backend: XHRBackend, options: RequestOptions, router: Router, snackBar: MdSnackBar) => {
        return new HttpService(backend, options, router, snackBar);
      },
      deps: [XHRBackend, RequestOptions, Router, MdSnackBar]
    },
  ],
  bootstrap: [AppComponent, ChangePasswordComponent]
})
export class AppModule { }
