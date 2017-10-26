import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import {
  MatButtonModule,
  MatCardModule, MatDatepickerModule, MatGridListModule, MatIconModule, MatInputModule, MatMenuModule,
  MatNativeDateModule,
  MatProgressBarModule,
  MatSnackBarModule,
  MatToolbarModule
} from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { NavComponent } from './components/nav/nav.component';
import { NavElementComponent } from './components/nav/nav-element/nav-element.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'angular2-highcharts';
import { HighchartsStatic } from 'angular2-highcharts/dist/HighchartsService';
import { chartFactory } from './factories/chart.factory';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatToolbarModule,
    ChartModule
  ],
  declarations: [
    HeaderComponent,
    NavComponent,
    NavElementComponent
  ],
  providers: [
    {
      provide: HighchartsStatic,
      useFactory: chartFactory
    }
  ],
  exports: [
    HeaderComponent,
    NavComponent,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatNativeDateModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatToolbarModule,
    ChartModule
  ]
})
export class OlafMaterialModule {
}
