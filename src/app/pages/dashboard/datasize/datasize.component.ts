import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-dashboard-datasize-bar',
  templateUrl: './datasize.component.html',
})
export class DatasizeBarComponent implements AfterViewInit, OnDestroy {
  initOpts: any = {};
  echartsIntance: any;
  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) {
  }

  onChartInit(ec) {
    this.echartsIntance = ec;
  }
  onResize(event) {
    this.initOpts = {
      height: document.getElementById('datasizeBarChartView').offsetHeight - 30,
    };
    this.echartsIntance.resize();
  }

  ngAfterViewInit() {
    this.initOpts = {
      height: document.getElementById('datasizeBarChartView').offsetHeight - 30,
    };
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
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
          // bottom: '3%',
          containLabel: true,
        },
        xAxis: [
          {
            type: 'category',
            data: ['用户管理', '数据接口', '配置管理', '日志模块', '采集量测', '系统监控'],
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
            data: [6.5, 16, 30, 38, 520, 25],
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
