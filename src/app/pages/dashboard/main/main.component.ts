import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { Observable } from 'rxjs/Observable';
import { WebSocketSubject } from 'rxjs/observable/dom/WebSocketSubject';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

import { CrudModel } from '../crud/crud.model';
import { WebsocketService } from "./websocket.service";

@Component({
  selector: 'ngx-dashboard-main-graph',
  templateUrl: './main.component.html',
})
export class MainGraphChartComponent implements AfterViewInit, OnDestroy {
  initOpts: any = {};
  options: any = {};
  themeSubscription: any;
  echartsIntance: any;
  frequency_seconds = 1000;

  client: any;
  url = '../api/v1/ws';
  private socket$: WebSocketSubject<CrudModel>;

  nodesM = [
    {
      name: '全业务中心',
      img: 'monitor.png',
    },
  ];
  nodes = [
    {
      name: '采集量测',
      img: 'iot.png',
      alarm: '',
      state: '1',
    },
    {
      name: '营销系统',
      img: 'yx.png',
      alarm: '',
      state: '1',
    }, {
      name: 'ERP',
      img: 'erp.png',
      alarm: '',
      state: '1',
    },
    {
      name: 'PMS',
      img: 'pms.png',
      alarm: '',
      state: '1',
    },
    {
      name: '电能质量监测',
      img: 'pms.png',
      alarm: '',
      state: '1',
    },
  ];
  links = [
    {
      name: '',
      source: '采集量测',
      target: '全业务中心',
      state: '1',
    },
    {
      name: '',
      source: '营销系统',
      target: '全业务中心',
      state: '1',
    }, {
      name: '',
      source: 'ERP',
      target: '全业务中心',
      state: '1',
    },
    {
      name: '',
      source: 'PMS',
      target: '全业务中心',
      state: '1',
    },
    {
      name: '',
      source: '电能质量监测',
      target: '全业务中心',
      state: '1',
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
  x_points = [2, 1, 0, 1, 2];
  dataMap = new Map();

  constructor(private theme: NbThemeService) {
    this.socket$ = WebSocketSubject.create(this.url);
    this.connection();
  }

  onChartInit(ec) {
    this.echartsIntance = ec;
  }
  onResize(event) {
    this.initOpts = {
      height: document.getElementById('mainGraphChartView').offsetHeight - 30,
    };
    this.echartsIntance.resize();
  }

  onChartClick(event) {
    this.connection();
    // this.socket$
    //   .subscribe(
    //     (message) => { console.info(message); alert(message); },
    //     (err) => console.error(err),
    //     () => console.warn('Completed!'),
    //   );
  }

  connection() {
    const ws = new SockJS(this.url);
    this.client = Stomp.over(ws);
    const that = this;

    this.client.connect({}, function (frame: any) {
      that.client.subscribe('/topic/binlog', (message: any) => {
        if (message.body) {
          alert(message.body);
        }
      });
    });
  }

  /**
   * Graph Event Handlers
   */
  getSource() {
    for (let j: number = 0; j < this.nodes.length; j++) {
      const node: any = {
        name: this.nodes[j].name,
        value: [this.x_points[j], this.y],
        symbolSize: 60,
        alarm: this.nodes[j].alarm,
        symbol: 'image://assets/images/' + this.nodes[j].img,
        itemStyle: {
          normal: {
            color: '#12b5d0',
          },
        },
      };
      this.dataMap.set(this.nodes[j].name, [this.x, this.y]);
      this.charts.nodes.push(node);
      this.y += -1;
    }
  }

  getTarget() {
    for (let k = 0; k < this.nodesM.length; k++) {
      const node = {
        name: this.nodesM[k].name,
        value: [this.x + 5, this.y + 3],
        symbolSize: 80,
        symbol: 'image://assets/images/' + this.nodesM[k].img,
        itemStyle: {
          normal: {
            color: '#12b5d0',
          },
        },
      };
      this.dataMap.set(this.nodesM[k].name, [this.x + 5, this.y + 3]);
      this.charts.nodes.push(node);
    }
  }

  checkStatus() {
    for (let i = 0; i < this.links.length; i++) {
      if (this.links[i].state === '1') {
        this.links[i].name = '插入10条';
      } else {
        this.links[i].name = '暂停传输中';
      }
      const link = {
        source: this.links[i].source,
        target: this.links[i].target,
        // target: nodesM[0].name,
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
            width: 3,
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
          symbolSize: 15,
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
  getLinks() {
    this.charts.links = [];
    this.charts.linesData = [];

    for (let i = 0; i < this.links.length; i++) {
      const _idx = Math.floor(Math.random() * 3);
      if (this.links[i].state === '1') {
        this.links[i].name = this.dml_ops[_idx].name + (Math.floor(Math.random() * 1000) + 1) + '条';
      } else {
        this.links[i].name = '暂停传输中';
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
  }

  /**
   * OnLaunch Handler
   */
  ngAfterViewInit() {
    const me = this;
    this.initOpts = {
      height: document.getElementById('mainGraphChartView').offsetHeight - 100,
    };

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.getSource();
      this.getTarget();
      this.checkStatus();
      this.buildOptions();

    });

    window.setInterval(() => {
      const dataI = [];
      this.getLinks();

      for (let n = 0; n < this.nodes.length; n++) {
        const alarm = this.nodes[n].alarm;
        if (alarm !== null && alarm !== undefined) {
          me.options.series[0].data[n].symbolSize = 40;
          me.options.series[0].data = this.charts.nodes;
          me.options.series[0].links = this.charts.links;
          me.options.series[1].data = this.charts.linesData;
          dataI.push(n);
        }
      }
      me.echartsIntance.setOption(me.options);
      setTimeout(() => {
        for (let m = 0; m < dataI.length; m++) {
          me.options.series[0].data[dataI[m]].symbolSize = 50;
        }
        me.options.series[0].data = me.charts.nodes;
        me.options.series[0].links = me.charts.links;
        me.options.series[1].data = me.charts.linesData;

        me.echartsIntance.setOption(me.options);

      }, 500);

    }, 1000);
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
