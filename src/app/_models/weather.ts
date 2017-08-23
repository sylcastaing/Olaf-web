import { Type } from "serializer.ts/Decorators";

export class Weather {

  public _id: string;
  public type: string;
  public value: number;

  @Type(() => Date)
  public date: Date;

  get unit(): string {
    var result = '°C';

    if (this.type === 'pressure') {
      result = ' hPa';
    }

    return result;
  }

  get label(): string {
    let label = '';

    if (this.value) {
      label = this.value + this.unit;
    }

    return label;
  }

  get serie(): any {
    return [this.date.getTime(), this.value];
  }
}