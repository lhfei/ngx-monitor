export class NodeModel {

  constructor(code: string, name: string, symbol: string, value: Array<number>,
    symbolSize: number, alarm: string, state: string) {
    this.code = code;
    this.name = name;
    this.symbol = symbol;
    this.value = value;
    this.symbolSize = symbolSize;
    this.alarm = alarm;
    this.state = state;
  }

  code: string;
  name: string;
  value: Array<number>;
  symbolSize: number;
  alarm: string;
  symbol: string;
  state: string;
  itemStyle: {
    normal: {
      color: '#12b5d0',
    },
  };

}
