import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { MainService } from '../main/main.service';

import { WrodCloudModel } from './word.model';

@Component({
  selector: 'ngx-dashboard-word-cloud',
  templateUrl: './word.component.html'
})
export class WordCloudComponent implements OnInit, AfterViewInit, OnDestroy {
  initOpts: any = {};
  echartsIntance: any;
  options: any = {};
  themeSubscription: any;
  words: Array<WrodCloudModel>;

  constructor(private theme: NbThemeService, private mainService: MainService) { }

  onChartInit(ec: any) {
    this.echartsIntance = ec;
  }
  onResize() {
    this.initOpts = {
      height: document.getElementById('wordCloudChartView').offsetHeight - 10
    };
    this.echartsIntance.resize();
  }

  getWords(system: string) {
    const me = this;
    this.mainService.getWords(system).then(data => {
      // clean it
      me.words = new Array;
      data.forEach(m => { // adapter module data
        this.words.push(new WrodCloudModel(m.schemaName, m.rate, m.total));
      });
    }).then(o => { // refresh chart view
      me.options.series[0].data = me.words;
      me.echartsIntance.setOption(me.options, true);
    });
  }

  ngAfterViewInit() {
    this.initOpts = {
      height: document.getElementById('wordCloudChartView').offsetHeight - 10,
    };

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors: any = config.variables;
      const echarts: any = config.variables.echarts;

      this.options = {
        color: [colors.primaryLight],
        series: [{
          type: 'wordCloud',
          gridSize: 1,
          sizeRange: [10, 60],
          rotationRange: [-45, 90],
          shape: 'circle',
          drawOutOfBound: true,
          textStyle: {
            normal: {
              color: () => {
                return 'rgb(' + [
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                  Math.round(Math.random() * 160),
                ].join(',') + ')';
              },
            },
            emphasis: {
              shadowBlur: 10,
              shadowColor: '#333',
            },
          },
          data: this.words,
        }],
      };
    });

  }

  ngOnInit(): void {
    require('echarts-wordcloud');
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
