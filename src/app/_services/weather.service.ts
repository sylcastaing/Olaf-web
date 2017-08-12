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
   * @param {Number} start 
   * @param {Number} end 
   * @returns 
   * 
   * @memberOf WeathersService
   */
  get(start: Number, end: Number) {
    return this.http.get('/api/weathers/' + start + '/' + end, null, true)
      .map(this.extractData)
      .map(datas => {
        let weathers: any = {};
        
        weathers.indoorTemps = deserialize<Weather[]>(Weather, datas.indoorTemps);
        weathers.outdoorTemps = deserialize<Weather[]>(Weather, datas.indoorTemps);
        weathers.pressures = deserialize<Weather[]>(Weather, datas.indoorTemps);

        return weathers;
      })
      .catch(this.handleError);
  }

}