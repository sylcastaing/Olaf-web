import './rxjs-operators';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OlafMaterialModule } from './olaf-material/olaf-material.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { routes } from './app.routing';
import { LoginModule } from './login/login.module';


@NgModule({
  imports: [
    BrowserModule,
    OlafMaterialModule,
    SharedModule,
    LoginModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
