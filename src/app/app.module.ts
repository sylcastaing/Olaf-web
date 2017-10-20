import './rxjs-operators';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OlafMaterialModule } from './olaf-material/olaf-material.module';
import { SharedModule } from './shared/shared.module';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    OlafMaterialModule,
    SharedModule,
    RouterModule.forRoot([])
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
