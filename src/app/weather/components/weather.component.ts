import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../services/weather.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { LoaderService } from '../../loader/services/loader.service';
import { Weather } from '../models/weather.model';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  public datesForm: FormGroup;

  private weathers: any;

  public todayDate: Date;
  public startDate: Date;
  public endDate: Date;

  public indoorTemp: Weather;
  public outdoorTemp: Weather;
  public pressure: Weather;

  public tempChart: any;
  public pressureChart: any;

  public tempChartOptions: any;
  public pressureChartOptions: any;

  public loading: boolean = true;
  public emptyWeathers: boolean = true;

  constructor(public weatherService: WeatherService,
              public formBuilder: FormBuilder,
              public snackBar: MatSnackBar,
              public loaderService: LoaderService) {
    this.todayDate = new Date();

    this.datesForm = formBuilder.group({
      startDate: [this.todayDate, Validators.required],
      endDate: [this.todayDate, Validators.required]
    });
  }

  ngOnInit() {
    this.initCharts();

    this.searchWeather();

    // Join weather room for socket io
    this.weatherService.joinRoom('weather');

    // Socket
    this.weatherService.getUpdates('weather', ':save')
      .map(res => new Weather(res))
      .subscribe(data => {
        if (data.type === 'indoorTemp') {
          this.indoorTemp = data;
          this.tempChart.series[0].addPoint(data.serie);
        } else if (data.type === 'outdoorTemp') {
          this.outdoorTemp = data;
          this.tempChart.series[1].addPoint(data.serie);
        } else if (data.type === 'pressure') {
          this.pressure = data;
          this.pressureChart.series[0].addPoint(data.serie);
        }
      });
  }

  /**
   * Get weathers
   */
  searchWeather() {
    if (this.datesForm.value.startDate.setHours(0, 0, 0, 0) < this.datesForm.value.endDate.setHours(23, 59, 59, 0)) {
      if (this.loading === false) {
        this.loaderService.show();
      }

      this.weatherService.get(this.datesForm.value.startDate, this.datesForm.value.endDate)
        .subscribe(weathers => {
          this.weathers = weathers;

          if (!this.indoorTemp) {
            this.indoorTemp = (weathers.indoorTemps) ? weathers.indoorTemps[0] : new Weather();
          }

          if (!this.outdoorTemp) {
            this.outdoorTemp = (weathers.outdoorTemps) ? weathers.outdoorTemps[0] : new Weather();
          }

          if (!this.pressure) {
            this.pressure = (weathers.pressures) ? weathers.pressures[0] : new Weather();
          }

          if (this.weathers.indoorTemps.length === 0 || this.weathers.outdoorTemps.length === 0 || this.weathers.pressures.length === 0) {
            this.emptyWeathers = true;

            this.snackBar.open('Aucune données trouvées pour les dates sélectionnées', 'Fermer', {
              duration: 3000,
            });
          }
          else {
            this.emptyWeathers = false;
          }

          this.feedCharts();

          this.loading = false;
          this.loaderService.hide();
        });
    } else {
      this.snackBar.open('La date de début est supérieure à la date de fin', 'Fermer', {
        duration: 3000,
      });
    }
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
