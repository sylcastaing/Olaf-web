declare var require: any;

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XHRBackend, RequestOptions } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { MaterialModule } from '@angular/material';
import { ChartModule } from 'angular2-highcharts';

import { AuthService, HttpService, WeatherService, UserService } from './_services';

import { AuthGuard } from './_guards';

import { WeatherComponent } from './weather/';
import { LoginComponent } from './login/';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    LoginComponent
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
    HttpService,
    {
      provide: HttpService,
      useFactory: (backend: XHRBackend, options: RequestOptions) => {
        return new HttpService(backend, options);
      },
      deps: [XHRBackend, RequestOptions]
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
