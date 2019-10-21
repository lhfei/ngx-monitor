export class LinkModel {
  constructor(name: string, source: string, target: string, state: string) {
    this.name = name;
    this.source = source;
    this.target = target;
    this.state = state;
  }
  name: string;
  source: string;
  target: string;
  state: string;
}
