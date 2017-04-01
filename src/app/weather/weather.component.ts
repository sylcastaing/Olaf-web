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

  constructor(public weatherService: WeatherService) {

  }

  ngOnInit() {
    var todayDate = new Date();
    var yesterdayDate = new Date().setDate(todayDate.getDate() - 1);

    this.weatherService.get(yesterdayDate, todayDate.getTime())
      .subscribe(weathers => {
        console.log(weathers);
        this.weathers = weathers;
        this.feedCharts();
        this.indoorTemp = new Weather((weathers.indoorTemps) ? weathers.indoorTemps[0] : {});
        this.outdoorTemp = new Weather((weathers.outdoorTemps) ? weathers.outdoorTemps[0] : {});
        this.pressure = new Weather((weathers.pressures) ? weathers.pressures[0] : {});
      })
    
    const Highcharts = require('highcharts');
    Highcharts.setOptions({
      global: {
        useUTC : false
      }
    });
  }

  private feedCharts() {
    this.tempChart = {
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
        data: this.weathers.indoorTemps.map(temp => {
          return [new Date(temp.date).getTime(), temp.value];
        })
      }, {
        data: this.weathers.outdoorTemps.map(temp => {
          return [new Date(temp.date).getTime(), temp.value];
        })
      }]
    };

    this.pressureChart = {
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
        data: this.weathers.pressures.map(temp => {
          return [new Date(temp.date).getTime(), temp.value];
        })
      }]
    };
  }
}