export class TotalChartData {
  public total: number = 0;
  public byCategory: ChartData[] = [new ChartData()];
}

export class ChartData {
  public name: string;
  public value: number;

  public constructor(_name = "", _value = 0) {
    this.name = _name;
    this.value = _value;
  }
}
