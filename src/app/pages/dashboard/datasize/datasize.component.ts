import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

import { MainService } from '../main/main.service';

@Component({
  selector: 'ngx-dashboard-datasize-bar',
  templateUrl: './datasize.component.html',
})
export class DatasizeBarComponent implements AfterViewInit, OnDestroy {
  initOpts: any = {};
  echartsIntance: any;
  options: any = {};
  themeSubscription: any;

  xData: Array<string> = [];
  yData: Array<number> = [];

  constructor(private theme: NbThemeService, private mainService: MainService) {
  }

  onChartInit(ec) {
    this.echartsIntance = ec;
  }
  onResize(event) {
    this.initOpts = {
      height: document.getElementById('datasizeBarChartView').offsetHeight - 10,
    };
    this.echartsIntance.resize();
  }

  getModules(system: string) {
    const me = this;
    this.mainService.getModules(system).then(data => {
      // clean it
      me.xData = [];
      me.yData = [];
      data.forEach(m => { // adapter module data
        me.xData.push(m.firstDir);
        me.yData.push(m.dirSize);
      });
    }).then(o => { // refresh chart view
      me.options.xAxis[0].data = me.xData;
      me.options.series[0].data = me.yData;
      me.echartsIntance.setOption(me.options, true);
    });
  }

  ngAfterViewInit() {
    this.initOpts = {
      height: document.getElementById('datasizeBarChartView').offsetHeight - 10,
    };
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        // backgroundColor: echarts.bg,
        color: [colors.primaryLight],
        title: {
          text: '各模块数据大小分布情况',
          left: 'center',
          top: 5,
          textStyle: {
            color: '#3F51B5',
          },
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: this.xData,
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
        series: [
          {
            name: '数据文件大小(GB)',
            type: 'bar',
            barWidth: '60%',
            label: {
              normal: {
                show: true,
                fontSize: 14,
                fontWeight: 'bold',
                color: '#fff',
                position: 'inside',
              },
            },
            data: this.yData,
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
