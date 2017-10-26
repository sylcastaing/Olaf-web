import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { OlafMaterialModule } from '../olaf-material/olaf-material.module';
import { WeatherComponent } from './components/weather.component';
import { WeatherService } from './services/weather.service';
import { WeatherChartComponent } from './components/weather-chart/weather-chart.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    OlafMaterialModule
  ],
  declarations: [
    WeatherComponent,
    WeatherChartComponent
  ],
  providers: [
    WeatherService
  ]
})
export class WeatherModule {
}
