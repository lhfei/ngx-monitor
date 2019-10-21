export class StatisticsModel {
  constructor(schemaName: string,  schemaNameZh: string,  rate: string,  total: number) {
    this.schemaName = schemaName;
    this.schemaNameZh = schemaNameZh;
    this.rate = rate;
    this.total = total;
  }

  schemaName: string;
  schemaNameZh: string;
  rate: string;
  total: number;
}
