import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { XHRBackend, RequestOptions, HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';

import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { MaterialModule, MdSnackBar } from '@angular/material';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';

import { httpFactory, chartFactory } from './_factories';
import { AuthService, HttpService, DatasService, WeatherService, UserService, DialogService } from './_services';

import { AuthGuard, AdminGuard } from './_guards';

import { CameraComponent } from './camera';
import { WeatherComponent } from './weather';
import { ApplicationsComponent } from './applications';
import { LoginComponent } from './login';
import { ChangePasswordComponent } from './user';
import { UsersComponent, AddUserComponent } from './admin';
import { ConfirmDialogComponent } from './dialog';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    CameraComponent,
    ApplicationsComponent,
    LoginComponent,
    ChangePasswordComponent,
    UsersComponent,
    AddUserComponent,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpModule,
    routing,
    ChartModule
  ],
  providers: [
    AuthGuard,
    AdminGuard,
    AuthService,
    DatasService,
    WeatherService,
    UserService,
    DialogService,
    {
      provide: HttpService,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions, Router, MdSnackBar]
    },
    {
      provide: HighchartsStatic,
      useFactory: chartFactory
    },
  ],
  entryComponents: [
    ChangePasswordComponent,
    AddUserComponent,
    ConfirmDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
