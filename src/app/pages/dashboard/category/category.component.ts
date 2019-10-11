import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-dashboard-catetory-pie',
  template: `
    <div #categoryPieChart echarts [options]="options"
    (window:resize)="onResize($event)" (chartInit)="onChartInit($event)"
    [initOpts]="initOpts" [autoResize]="true" class="echart"></div>
  `,
})
export class CategoryPieChartComponent implements AfterViewInit, OnDestroy {
  initOpts: any = {};
  options: any = {};
  themeSubscription: any;
  echartsIntance: any;

  constructor(private theme: NbThemeService) {
  }

  onChartInit(ec) {
    this.echartsIntance = ec;
  }
  onResize(event) {
    this.initOpts = {
      height: document.getElementById('categoryPieChartView').offsetHeight - 30,
    };
    this.echartsIntance.resize();
  }

  ngAfterViewInit() {
    this.initOpts = {
      height: document.getElementById('categoryPieChartView').offsetHeight - 30,
    };

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors = config.variables;
      const echarts: any = config.variables.echarts;


      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        title: {
          text: '表类型占比',
          left: 'left',
          top: 5,
          textStyle: {
            fontWeight: 'normal',
            color: '#3F51B5',
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)',
        },
        legend: {
          orient: 'vertical',
          left: 'right',
          data: ['业务表', '日志表', '临时表', '其它', '配置表'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: '数据类别',
            type: 'pie',
            radius: '90%',
            center: ['50%', '50%'],
            roseType: 'radius',
            data: [
              { value: 335, name: '日志表' },
              { value: 310, name: '临时表' },
              { value: 234, name: '其它' },
              { value: 135, name: '配置表' },
              { value: 548, name: '业务表' },
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: echarts.itemHoverShadowColor,
              },
            },
            label: {
              normal: {
                textStyle: {
                  color: echarts.textColor,
                },
              },
            },
            labelLine: {
              normal: {
                lineStyle: {
                  color: echarts.axisLineColor,
                },
              },
            },
          },
        ],
      };
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
