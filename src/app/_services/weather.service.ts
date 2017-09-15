import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { DatasService } from './datas.service';

import { Weather } from '../_models';

import { deserialize } from 'serializer.ts/Serializer';

import 'rxjs/add/operator/map';

/**
 * Get Weathers datas
 * 
 * @export
 * @class WeatherService
 */
@Injectable()
export class WeatherService extends DatasService {

  /**
   * Creates an instance of WeathersService.
   * @param {HttpService} http 
   * 
   * @memberOf WeathersService
   */
  constructor(public http: HttpService) {
    super();
  }

  /**
   * Get datas between 2 dates
   * 
   * @param {Date} start 
   * @param {Date} end 
   * @returns 
   * 
   * @memberOf WeathersService
   */
  public get(startDate: Date, endDate: Date) {

    let start = startDate.setHours(0,0,0,0);
    let end = endDate.setHours(23,59,59,0);

    return this.http.get('/api/weathers/' + start + '/' + end, null, true)
      .map(this.extractData)
      .map(datas => {
        let weathers: any = {};
        
        weathers.indoorTemps = deserialize<Weather[]>(Weather, datas.indoorTemps);
        weathers.outdoorTemps = deserialize<Weather[]>(Weather, datas.outdoorTemps);
        weathers.pressures = deserialize<Weather[]>(Weather, datas.pressures);

        return weathers;
      })
      .catch(this.handleError);
  }
}