import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-dashboard-cmp-radar',
  templateUrl: './cmp.component.html',
  // template: `
  //   <div echarts [options]="options" class="echart"></div>
  // `,
})
export class CmpRadarComponent implements AfterViewInit, OnDestroy {
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
      height: document.getElementById('cmpRadarChartView').offsetHeight - 10,
    };
    this.echartsIntance.resize();
  }

  ngAfterViewInit() {
    this.initOpts = {
      height: document.getElementById('cmpRadarChartView').offsetHeight - 10,
    };

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        // backgroundColor: echarts.bg,
        color: [colors.danger, colors.warning],
        title: {
          text: '模块数据变化',
          left: 'left',
          top: 5,
          textStyle: {
            fontWeight: 'normal',
            color: '#3F51B5',
          },
        },
        tooltip: {},
        legend: {
          orient: 'vertical',
          left: 'right',
          data: ['业务模块', '数据条目'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        radar: {
          name: {
            textStyle: {
              color: echarts.textColor,
            },
          },
          indicator: [
            { name: '用户管理', max: 6500 },
            { name: '数据接口', max: 16000 },
            { name: '配置管理', max: 30000 },
            { name: '日志模块', max: 38000 },
            { name: '采集量测', max: 52000 },
            { name: '系统监控', max: 25000 },
          ],
          splitArea: {
            areaStyle: {
              color: 'transparent',
            },
          },
        },
        series: [
          {
            name: 'Budget vs Spending',
            type: 'radar',
            data: [
              {
                value: [4300, 10000, 28000, 35000, 50000, 19000],
                name: '业务模块',
                label: {
                  normal: {
                    show: true,
                    formatter: function (params) {
                      return params.value;
                    },
                  },
                },
              },
              {
                value: [5000, 14000, 28000, 31000, 42000, 21000],
                name: '数据条目',
              },
            ],
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
