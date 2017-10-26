import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/services/http.service';
import { DataService } from '../../shared/services/data.service';
import { Weather } from '../models/weather.model';

@Injectable()
export class WeatherService extends DataService {

  /**
   * Constructor
   *
   * @param {HttpService} http
   */
  constructor(public http: HttpService) {
    super();
  }

  /**
   * Get weathers between 2 dates
   *
   * @param {Date} startDate
   * @param {Date} endDate
   * @returns {Observable<any | any>}
   */
  public get(startDate: Date, endDate: Date) {

    const start = startDate.setHours(0, 0, 0, 0);
    const end = endDate.setHours(23, 59, 59, 0);

    return this.http.get('/api/weathers/' + start + '/' + end, true)
      .map(this.extractData)
      .map(datas => {
        const weathers: any = {};

        weathers.indoorTemps = datas.indoorTemps.map(data => new Weather(data));
        weathers.outdoorTemps = datas.outdoorTemps.map(data => new Weather(data));
        weathers.pressures = datas.pressures.map(data => new Weather(data));

        return weathers;
      })
      .catch(this.handleError);
  }

}
