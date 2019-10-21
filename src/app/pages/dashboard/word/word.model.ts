export class WrodCloudModel {
  schemaName: string;
  name: string;
  value: number;

  constructor(schemaName: string,
    word: string,
    total: number) {
    this.schemaName = schemaName;
    this.name = word;
    this.value = total;
  }
}
