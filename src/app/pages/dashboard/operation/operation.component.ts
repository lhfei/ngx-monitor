import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-dashboard-operation-pie',
  templateUrl: './operation.component.html',
})

export class OperationPieComponent implements AfterViewInit, OnDestroy {
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
      height: document.getElementById('operationPieChartView').offsetHeight - 30,
    };
    this.echartsIntance.resize();
  }

  ngAfterViewInit() {
    this.initOpts = {
      height: document.getElementById('operationPieChartView').offsetHeight - 30,
    };
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      const colors = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        backgroundColor: echarts.bg,
        color: [colors.warningLight, colors.infoLight, colors.dangerLight, colors.successLight, colors.primaryLight],
        title: {
          text: '操作用户占比',
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
          data: ['Weblogic', 'PLSQL', 'Admin', '其它'],
          textStyle: {
            color: echarts.textColor,
          },
        },
        series: [
          {
            name: '操作类型',
            type: 'pie',
            radius: [20, 110],
            center: ['50%', '50%'],
            roseType: 'radius',
            data: [
              { value: 335, name: 'PLSQL' },
              { value: 310, name: 'Admin' },
              { value: 234, name: '其它' },
              { value: 1548, name: 'Weblogic' },
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
