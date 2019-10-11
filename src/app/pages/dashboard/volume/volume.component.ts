import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-dashboard-volume-bar',
  templateUrl: './volume.component.html',
})
export class VolumeBarComponent implements AfterViewInit, OnDestroy {
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
      height: document.getElementById('volumeBarChartView').offsetHeight - 30,
    };
    this.echartsIntance.resize();
  }

  ngAfterViewInit() {
    this.initOpts = {
      height: document.getElementById('volumeBarChartView').offsetHeight - 30,
    };
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.primaryLight],
        title: {
          text: '数据量分布情况',
          left: 'center',
          top: 5,
          textStyle: {
            fontWeight: 'normal',
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
            data: ['< 1K', '1K-10K', '1-5W', '5-50W', '50-100W', '100-500W', '> 500W'],
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
              show: true,
              textStyle: {
                color: echarts.textColor,
              },
            },
          },
        ],
        series: [
          {
            name: '数据表数量(张)',
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
            data: [10, 52, 200, 334, 390, 330, 220],
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
