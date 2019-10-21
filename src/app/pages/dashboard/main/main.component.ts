import { AfterViewInit, Component, OnDestroy, Input } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { Observable } from 'rxjs/Observable';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import { VolumeBarComponent } from '../volume/volume.component';
import { DatasizeBarComponent } from '../datasize/datasize.component';
import { WordCloudComponent } from '../word/word.component';
import { CrudModel } from '../crud/crud.model';
import { SystemModel } from './system.model';
import { NodeModel } from './node.model';
import { LinkModel } from './link.model';
import { MainService } from './main.service';

@Component({
  selector: 'ngx-dashboard-main-graph',
  templateUrl: './main.component.html',
})
export class MainGraphChartComponent implements AfterViewInit, OnDestroy {
  themeSubscription: any;
  initOpts: any = {};
  options: any = {};
  echartsIntance: any;
  client: any;  // socket client
  url = '../ws';

  private monitorName: string = '全业务中心';
  nodes: Array<SystemModel> = [];
  links: Array<LinkModel> = [];
  currentSystem: NodeModel;

  // Injtect component
  @Input() valumeCmp: VolumeBarComponent;
  @Input() datasizeCmp: DatasizeBarComponent;
  @Input() wordCloudCmp: WordCloudComponent;

  nodesM = [
    {
      name: this.monitorName,
      img: 'monitor.png',
    },
  ];

  charts = {
    nodes: [],
    links: [],
    linesData: [],
  };

  dml_ops = [{
    name: '插入',
    color: '#00b050',
  }, {
    name: '修改',
    color: '#ffaf00',
  }, {
    name: '删除',
    color: '#ff0000',
  }];

  x = 1;
  y = 1;
  dataMap = new Map();

  constructor(private theme: NbThemeService, private mainService: MainService) {
    // this.socket$ = WebSocketSubject.create(this.url);
    this.connection();

    this.getSystems();
  }

  onChartInit(ec) {
    this.echartsIntance = ec;
  }
  onResize(event) {
    this.initOpts = {
      height: document.getElementById('mainGraphChartView').offsetHeight - 10,
    };
    this.echartsIntance.resize();
  }

  refreshChartView() {
    this.datasizeCmp.getModules(this.currentSystem.code);
    this.valumeCmp.getStatistics(this.currentSystem.code);
    this.wordCloudCmp.getWords(this.currentSystem.code);
  }

  onChartClick(event) {
    if (event.name !== this.monitorName) {
      this.currentSystem = event.data;
      this.refreshChartView();
    }
  }

  connection() {
    const ws = new SockJS(this.url);
    this.client = Stomp.over(ws);
    const that = this;

    this.client.connect({}, function (frame: any) {
      that.client.subscribe('/topic/binlog', (message: any) => {
        if (message.body) {
          // alert(message.body);
          that.getLinks(JSON.parse(message.body));
        }
      });
    });
  }

  /**
   * List all Systems
   *
  */
  getSystems() {
    this.mainService.getSystems().then(data => {
      this.nodes = data;
      this.currentSystem = new NodeModel(this.nodes[0].schemaName, this.nodes[0].schemaNameZh,
        null, null, null, null, null);
    }).then(o => {// adapter link nodes
      this.nodes.forEach(system => {
        const link: LinkModel = new LinkModel('', system.schemaNameZh, this.monitorName, '1');
        this.links.push(link);
      });
    }).then(o => {// init GraphChart
      this.drawGraphChart();
    }).then(o => { // regresh Chart
      this.refreshChartView();
    });
  }

  /**
   * Graph Event Handlers
   */
  getSource() {
    const x_points = [3, 1.5, 0, 2];
    let idx: number = 0;
    this.nodes.forEach(system => {
      const node: NodeModel = new NodeModel(system.schemaName, system.schemaNameZh,
        'image://assets/images/' + system.schemaName + '.png',
        [x_points[idx], this.y], 60, '', '1');

      this.dataMap.set(system.schemaNameZh, [x_points[idx], this.y]);
      this.charts.nodes.push(node);
      this.y += -1;
      idx ++;

    });
  }

  getTarget() {
    for (let k = 0; k < this.nodesM.length; k++) {
      const node: NodeModel = new NodeModel(this.nodesM[k].name, this.nodesM[k].name,
        'image://assets/images/' + this.nodesM[k].img,
        [this.x + 5, this.y + 2], 80, '', '1');
      this.dataMap.set(this.nodesM[k].name, [this.x + 5, this.y + 2]);
      this.charts.nodes.push(node);
    }
  }

  checkStatus(model: any) {
    for (let i = 0; i < this.links.length; i++) {
      const link = {
        source: this.links[i].source,
        target: this.links[i].target,
        label: {
          normal: {
            show: true,
            formatter: this.links[i].name,
          },
        },
        lineStyle: {
          normal: {
            color: '#00b050',
          },
        },
      };
      this.charts.links.push(link);

      if (this.links[i].state === '1') {
        link.lineStyle.normal.color = '#bbff17';
        const lines = [{
          coord: this.dataMap.get(this.links[i].source),
        }, {
          coord: this.dataMap.get(this.links[i].target),
        }];
        this.charts.linesData.push(lines);
      }
    }
  }

  buildOptions() {
    this.options = {
      title: {
        text: '数据监控中心',
        left: 'center',
        textStyle: {
          fontWeight: 'normal',
          color: '#3F51B5',
        },
      },
      xAxis: {
        show: false,
        type: 'value',
      },
      yAxis: {
        show: false,
        type: 'value',
      },
      series: [{
        type: 'graph',
        layout: 'none',
        coordinateSystem: 'cartesian2d',
        symbolSize: 50,
        label: {
          normal: {
            show: true,
            fontSize: 14,
            position: 'bottom',
            color: '#FFF',
          },
        },
        lineStyle: {
          normal: {
            width: 1,
            shadowColor: 'none',
            curveness: '0.25',
          },
        },
        edgeSymbolSize: 8,
        data: this.charts.nodes,
        links: this.charts.links,
        itemStyle: {
          normal: {
            label: {
              show: true,
              formatter: function (item) {
                return item.data.name;
              },
            },
          },
        },
      }, {
        name: 'A',
        type: 'lines',
        coordinateSystem: 'cartesian2d',
        effect: {
          show: true,
          trailLength: 0,
          symbol: 'arrow',
          color: '#0fff17',
          symbolSize: 10,
        },
        lineStyle: {
          curveness: '0.25',
        },
        data: this.charts.linesData,
      }],
    };
  }

  /**
   * Update Links status
   */
  getLinks(model: any) {
    this.charts.links = [];
    this.charts.linesData = [];

    for (let i = 0; i < this.links.length; i++) {
      const _idx = Math.floor(Math.random() * 3);
      // if (this.links[i].state === '1') {
      //   this.links[i].name = this.dml_ops[_idx].name + (Math.floor(Math.random() * 1000) + 1) + '条';
      // } else {
      //   this.links[i].name = '暂停传输中';
      // }

      if (model.type === 'INSERT') {
        this.links[i].name = '插入' + model.data.length + '条';
      } else if (model.type === 'UPDATE') {
        this.links[i].name = '更新' + model.data.length + '条';
      } else if (model.type === 'DELETE') {
        this.links[i].name = '删除' + model.data.length + '条';
      }

      const link = {
        source: this.links[i].source,
        target: this.links[i].target,
        // target: nodesM[0].name,
        label: {
          normal: {
            show: true,
            fontSize: 14,
            formatter: this.links[i].name,
          },
        },
        lineStyle: {
          normal: {
            color: this.dml_ops[_idx].color,
          },
        },
      };
      this.charts.links.push(link);

      if (this.links[i].state === '1') {
        // link.lineStyle.normal.color='#bbff17';
        link.lineStyle.normal.color = this.dml_ops[_idx].color;
        const lines = [{
          coord: this.dataMap.get(this.links[i].source),
        }, {
          coord: this.dataMap.get(this.links[i].target),
        }];
        this.charts.linesData.push(lines);
      }
    }

    this.buildOptions();
    this.echartsIntance.setOption(this.options);
  }

  drawGraphChart() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.getSource();
      this.getTarget();
      this.checkStatus(new CrudModel());
      this.buildOptions();
    });
  }

  /**
   * OnLaunch Handler
   */
  ngAfterViewInit() {
    const me = this;
    this.initOpts = {
      height: document.getElementById('mainGraphChartView').offsetHeight - 100,
    };

    // window.setInterval(() => {
    //   const dataI = [];
    //   this.getLinks();

    //   for (let n = 0; n < this.nodes.length; n++) {
    //     const alarm = this.nodes[n].alarm;
    //     if (alarm !== null && alarm !== undefined) {
    //       me.options.series[0].data[n].symbolSize = 40;
    //       me.options.series[0].data = this.charts.nodes;
    //       me.options.series[0].links = this.charts.links;
    //       me.options.series[1].data = this.charts.linesData;
    //       dataI.push(n);
    //     }
    //   }
    //   me.echartsIntance.setOption(me.options);
    //   setTimeout(() => {
    //     for (let m = 0; m < dataI.length; m++) {
    //       me.options.series[0].data[dataI[m]].symbolSize = 50;
    //     }
    //     me.options.series[0].data = me.charts.nodes;
    //     me.options.series[0].links = me.charts.links;
    //     me.options.series[1].data = me.charts.linesData;

    //     me.echartsIntance.setOption(me.options);

    //   }, 500);

    // }, 1000);
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
