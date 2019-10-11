import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-monitor-crud-multiple-xaxis',
  template: `
    <div echarts [options]="options" class="echart"></div>
  `,
})
export class CrudMultipleXaxisComponent implements AfterViewInit, OnDestroy {
  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

  ngAfterViewInit() {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.danger, colors.primary, colors.info],
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}',
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
            type: 'log',
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
          // bottom: '3%',
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
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
