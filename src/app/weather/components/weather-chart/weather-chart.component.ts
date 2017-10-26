import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-weather-chart',
  templateUrl: './weather-chart.component.html',
  styleUrls: ['./weather-chart.component.scss']
})
export class WeatherChartComponent {

  @Input()
  public chartOptions: any;

  @Output()
  public saveChart = new EventEmitter<any>();
}
