declare var require: any;

import { Component, OnInit, OnDestroy } from '@angular/core';

import { WeatherService } from '../_services';

import { Weather } from '../_models';

import { deserialize } from "serializer.ts/Serializer";

@Component({
  moduleId: module.id,
  templateUrl: 'weather.component.html',
  styleUrls: ['weather.component.css']
})
export class WeatherComponent implements OnInit, OnDestroy {

  private weathers: any;

  public indoorTemp: Weather;
  public outdoorTemp: Weather;
  public pressure: Weather;

  public tempChart: any;
  public pressureChart: any;

  public tempChartOptions: any;
  public pressureChartOptions: any;

  constructor(public weatherService: WeatherService) {

  }

  ngOnInit() {
    this.initCharts();

    var todayDate = new Date();
    var yesterdayDate = new Date().setDate(todayDate.getDate() - 1);

    this.weatherService.get(yesterdayDate, todayDate.getTime())
      .subscribe(weathers => {
        this.weathers = weathers;
        this.feedCharts();
        this.indoorTemp = (weathers.indoorTemps) ? weathers.indoorTemps[0] : new Weather();
        this.outdoorTemp = (weathers.outdoorTemps) ? weathers.outdoorTemps[0] : new Weather();
        this.pressure = (weathers.pressures) ? weathers.pressures[0] : new Weather();
      });
    
    this.weatherService.joinRoom('weather');

    this.weatherService.getUpdates('weather', ':save')
      .map(res => deserialize<Weather>(Weather, res))
      .subscribe(data => {
        if (data.type === 'indoorTemp') {
          this.indoorTemp = data;
          this.tempChart.series[0].addPoint([data.date.getTime(), data.value]);
        }
        else if (data.type === 'outdoorTemp') {
          this.outdoorTemp = data;
          this.tempChart.series[1].addPoint([data.date.getTime(), data.value]);
        }
        else if (data.type === 'pressure') {
          this.pressure = data;
          this.pressureChart.series[0].addPoint([data.date.getTime(), data.value]);
        }
      });
    
    const Highcharts = require('highcharts');
    Highcharts.setOptions({
      global: {
        useUTC : false
      }
    });
  }

  saveTempChart(chart) {
    this.tempChart = chart;
  }

  savePressureChart(chart) {
    this.pressureChart = chart;
  }

  private feedCharts() {
    this.feedIndoorTempsChart();
    this.feedOutdoorTempsChart();
    this.feedPressuresChart();
  }

  private feedIndoorTempsChart() {
    this.weathers.indoorTemps.forEach(data => {
      this.tempChart.series[0].addPoint([new Date(data.date).getTime(), data.value]);
    });
  }

  private feedOutdoorTempsChart() {
    this.weathers.outdoorTemps.forEach(data => {
      this.tempChart.series[1].addPoint([new Date(data.date).getTime(), data.value]);
    });
  }

  private feedPressuresChart() {
    this.weathers.pressures.forEach(data => {
      this.pressureChart.series[0].addPoint([new Date(data.date).getTime(), data.value]);
    });
  }

  private initCharts() {
    this.tempChartOptions = {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Températures'
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          hour: '%H',
          minute: '%H:%M'
        },
        title: {
          text: 'Date'
        }
      },
      yAxis: {
        allowDecimals: false,
        minPadding: 0.5,
        title: {
          text: 'Température'
        }
      },
      series: [{
        name: 'Intérieur'
      }, {
        name: 'Extérieur'
      }]
    };

    this.pressureChartOptions = {
      chart: {
        type: 'spline'
      },
      title: {
        text: 'Pressions'
      },
      xAxis: {
        type: 'datetime',
        dateTimeLabelFormats: {
          hour: '%H',
          minute: '%H:%M'
        },
        title: {
          text: 'Date'
        }
      },
      yAxis: {
        allowDecimals: false,
        title: {
          text: 'Pression'
        }
      },
      series: [{
        name: 'Pression'
      }]
    };
  }

  ngOnDestroy() {
    this.weatherService.leaveRoom('weather');
  }
}