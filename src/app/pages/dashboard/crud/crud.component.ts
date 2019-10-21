import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { CrudModel } from './crud.model';
import { CrudService } from './crud.service';

@Component({
  selector: 'ngx-dashboard-crud-line',
  templateUrl: './crud.component.html',
})
export class CrudMultipleLineComponent implements AfterViewInit, OnDestroy {
  initOpts: any = {};
  echartsIntance: any;
  options: any = {};
  themeSubscription: any;

  crudModel: CrudModel = new CrudModel();

  constructor(private theme: NbThemeService, public crudService: CrudService) {
  }

  onChartInit(ec) {
    this.echartsIntance = ec;
  }
  onResize(event) {
    this.initOpts = {
      height: document.getElementById('crudMultipleLineChartLine').offsetHeight - 10,
    };
    this.echartsIntance.resize();
  }

  ngAfterViewInit() {
    const me = this;
    this.initOpts = {
      height: document.getElementById('crudMultipleLineChartLine').offsetHeight - 10,
    };
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        // backgroundColor: echarts.bg,
        color: [colors.danger, colors.primary, colors.info],
        title: {
          text: '数据操作统计',
          left: 'center',
          top: 5,
          textStyle: {
            fontWeight: 'normal',
            color: '#3F51B5',
          },
        },
        tooltip: {
          trigger: 'axis',
        },
        legend: {
          left: 'left',
          data: ['插入', '修改', '删除'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        xAxis: [
          {
            type: 'category',
            data: ['2019-09-09', '2019-09-10', '2019-09-11', '2019-09-12',
              '2019-09-13', '2019-09-14', '2019-09-15', '2019-09-16', '2019-09-17',
              '2019-09-18', '2019-09-19', '2019-09-20', '2019-09-21', '2019-09-22',
              '2019-09-23'],
            axisTick: {
              alignWithLabel: true,
            },
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: echarts.axisLineColor,
              },
            },
            splitLine: {
              lineStyle: {
                color: echarts.splitLineColor,
              },
            },
            axisLabel: {
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        series: [
          {
            name: '插入',
            type: 'line',
            smooth: true,
            data: [495, 583, 629, 1281, 3032, 518, 559, 594, 585, 643, 2217, 889, 597, 523, 1108],
          },
          {
            name: '修改',
            type: 'line',
            smooth: true,
            data: [175, 93, 149, 241, 132, 228, 209, 245, 195, 214, 301, 291, 97, 123, 208],
          },
          {
            name: '删除',
            type: 'line',
            smooth: true,
            data: [35, 23, 29, 81, 32, 18, 19, 74, 85, 43, 17, 59, 67, 23, 108],
          },
        ],
      };
    });

    // Refresh Data
    window.setInterval(() => {
      const axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
      const c_data = me.options.series[0].data;
      const u_data = me.options.series[1].data;
      const d_data = me.options.series[2].data;
      c_data.shift();
      c_data.push(Math.round(Math.random() * 500));

      u_data.shift();
      u_data.push(Math.round(Math.random() * 300));

      u_data.shift();
      u_data.push(Math.round(Math.random() * 200));

      me.options.xAxis[0].data.shift();
      me.options.xAxis[0].data.push(axisData);

      me.echartsIntance.setOption(me.options, true);
    }, 2 * 1000);

    this.crudService.getSeries();
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
