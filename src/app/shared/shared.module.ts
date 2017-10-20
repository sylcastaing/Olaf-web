import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from './services/data.service';
import { HttpService } from './services/http.service';
import { UserService } from './services/user.service';
import { AuthService } from './services/auth.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [
    AuthService,
    DataService,
    HttpService,
    UserService
  ]
})
export class SharedModule { }
