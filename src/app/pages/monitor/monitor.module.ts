import { NgModule } from '@angular/core';
import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,
} from '@nebular/theme';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ChartModule } from 'angular2-chartjs';
import { ThemeModule } from '../../@theme/theme.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { MainComponent } from './main/main.component';
import { MonitorComponent } from './monitor.component';
import { CategoryComponent } from './category/category.component';
import { CmpRadarComponent } from './cmp/cmp.component';
import { OperationPieComponent } from './operation/operation.component';
import { VolumeBarComponent } from './volume/volume.component';
import { DatasizeBarComponent } from './datasize/datasize.component';
import { CrudMultipleXaxisComponent } from './crud/crud.component';
import { WordCloudComponent } from './word/word.component';

@NgModule({
  imports: [
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbSelectModule,
    NbListModule,
    ChartModule,
    NbProgressBarModule,
    NgxEchartsModule,
    NgxChartsModule,
    LeafletModule,
  ],
  declarations: [
    MonitorComponent,
    MainComponent,
    CategoryComponent,
    CmpRadarComponent,
    OperationPieComponent,
    VolumeBarComponent,
    DatasizeBarComponent,
    CrudMultipleXaxisComponent,
    WordCloudComponent,
  ],
  providers: [
  ],
})
export class MonitorModule { }
