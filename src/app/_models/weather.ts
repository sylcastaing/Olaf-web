export class Weather {
  _id: string;
  type: string;
  value: number;
  date: Date;

  constructor(input: any) {
    this._id = input._id;
    this.type = input.type;
    this.value = input.value;
    this.date = input.date;
  }

  get unit(): string {
    var result = '°C';

    if (this.type === 'pressure') {
      result = ' hPa';
    }

    return result;
  }

  get label(): string {
    return this.value + this.unit;
  }
}