interface WeatherParam {
  _id: string;
  type: string;
  value: number;
  date: Date;
}

export class Weather {

  public _id: string;
  public type: string;
  public value: number;
  public date: Date;

  /**
   * Constructor
   *
   * @param {WeatherParam} weather
   */
  constructor(weather?: WeatherParam) {
    if (weather) {
      this._id = weather._id;
      this.type = weather.type;
      this.value = weather.value;
      this.date = new Date(weather.date);
    }
  }

  /**
   * Return unit
   *
   * @returns {string}
   */
  get unit(): string {
    let result = '°C';

    if (this.type === 'pressure') {
      result = ' hPa';
    }

    return result;
  }

  /**
   * Return label
   *
   * @returns {string}
   */
  get label(): string {
    let label = '';

    if (this.value) {
      label = this.value + this.unit;
    }

    return label;
  }

  /**
   * Return serie for HighChart
   *
   * @returns {any}
   */
  get serie(): any {
    return [this.date.getTime(), this.value];
  }
}
