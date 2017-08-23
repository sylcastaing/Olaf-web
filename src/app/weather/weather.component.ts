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

    /**
     * Get weathers
     */
    this.weatherService.get(yesterdayDate, todayDate.getTime())
      .subscribe(weathers => {
        this.weathers = weathers;
        
        this.indoorTemp = (weathers.indoorTemps) ? weathers.indoorTemps[0] : new Weather();
        this.outdoorTemp = (weathers.outdoorTemps) ? weathers.outdoorTemps[0] : new Weather();
        this.pressure = (weathers.pressures) ? weathers.pressures[0] : new Weather();

        this.feedCharts();
      });
    
    // Join weather room for socket io
    this.weatherService.joinRoom('weather');
    
    // Socket
    this.weatherService.getUpdates('weather', ':save')
      .map(res => deserialize<Weather>(Weather, res))
      .subscribe(data => {
        if (data.type === 'indoorTemp') {
          this.indoorTemp = data;
          this.tempChart.series[0].addPoint(data.serie);
        }
        else if (data.type === 'outdoorTemp') {
          this.outdoorTemp = data;
          this.tempChart.series[1].addPoint(data.serie);
        }
        else if (data.type === 'pressure') {
          this.pressure = data;
          this.pressureChart.series[0].addPoint(data.serie);
        }
      });
    
    const Highcharts = require('highcharts');
    Highcharts.setOptions({
      global: {
        useUTC : false
      }
    });
  }

  /**
   * Init tempChart
   * 
   * @param {any} chart 
   * @memberof WeatherComponent
   */
  saveTempChart(chart) {
    this.tempChart = chart;
  }

  /**
   * Init Presure chart
   * 
   * @param {any} chart 
   * @memberof WeatherComponent
   */
  savePressureChart(chart) {
    this.pressureChart = chart;
  }

  /**
   * Feed charts
   * 
   * @private
   * @memberof WeatherComponent
   */
  private feedCharts() {
    this.feedIndoorTempsChart();
    this.feedOutdoorTempsChart();
    this.feedPressuresChart();
  }

  /**
   * feedIndoorTempsChart
   * 
   * @private
   * @memberof WeatherComponent
   */
  private feedIndoorTempsChart() {
    let values = [];
    for (let data of this.weathers.indoorTemps) {
      values.push(data.serie);
    }
    this.tempChart.series[0].setData(values);
  }

  /**
   * feedOutdoorTempsChart
   * 
   * @private
   * @memberof WeatherComponent
   */
  private feedOutdoorTempsChart() {
    let values = [];
    for (let data of this.weathers.outdoorTemps) {
      values.push(data.serie);
    }
    this.tempChart.series[1].setData(values);
  }

  /**
   * feedPressuresChart
   * 
   * @private
   * @memberof WeatherComponent
   */
  private feedPressuresChart() {
    let values = [];
    for (let data of this.weathers.pressures) {
      values.push(data.serie);
    }
    this.pressureChart.series[0].setData(values);
  }

  /**
   * Set up charts
   * 
   * @private
   * @memberof WeatherComponent
   */
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

  /**
   * Leave weather room on destroy
   * 
   * @memberof WeatherComponent
   */
  ngOnDestroy() {
    this.weatherService.leaveRoom('weather');
  }
}