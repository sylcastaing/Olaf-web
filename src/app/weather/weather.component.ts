declare var require: any;

import { Component, OnInit } from '@angular/core';

import { WeatherService } from '../_services';

import { Weather } from '../_models';

@Component({
  moduleId: module.id,
  templateUrl: 'weather.component.html',
  styleUrls: ['weather.component.css']
})
export class WeatherComponent implements OnInit {

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
        this.indoorTemp = new Weather((weathers.indoorTemps) ? weathers.indoorTemps[0] : {});
        this.outdoorTemp = new Weather((weathers.outdoorTemps) ? weathers.outdoorTemps[0] : {});
        this.pressure = new Weather((weathers.pressures) ? weathers.pressures[0] : {});
      });

    this.weatherService.getUpdates('weather')
      .subscribe(data => {
        if (data.type === 'indoorTemp') {
          this.indoorTemp = new Weather(data);
          this.tempChart.series[0].addPoint([new Date(data.date).getTime(), data.value]);
        }
        else if (data.type === 'outdoorTemp') {
          this.outdoorTemp = new Weather(data);
          this.tempChart.series[1].addPoint([new Date(data.date).getTime(), data.value]);
        }
        else if (data.type === 'pressure') {
          this.pressure = new Weather(data);
          this.pressureChart.series[0].addPoint([new Date(data.date).getTime(), data.value]);
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
}