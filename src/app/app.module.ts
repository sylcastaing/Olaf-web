import './rxjs-operators';

import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { OlafMaterialModule } from './olaf-material/olaf-material.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { routes } from './app.routing';
import { LoginModule } from './login/login.module';
import { LoaderModule } from './loader/loader.module';
import { WeatherModule } from './weather/weather.module';


@NgModule({
  imports: [
    BrowserModule,
    OlafMaterialModule,
    SharedModule,
    LoaderModule,
    LoginModule,
    WeatherModule,
    RouterModule.forRoot(routes)
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'fr-FR'
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}
