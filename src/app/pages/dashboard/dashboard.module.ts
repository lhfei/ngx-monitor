import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { NbCardModule } from '@nebular/theme';

import { ThemeModule } from '../../@theme/theme.module';
import { DashboardComponent } from './dashboard.component';

import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';

import { MainGraphChartComponent } from './main/main.component';
import { CategoryPieChartComponent } from './category/category.component';
import { CmpRadarComponent } from './cmp/cmp.component';
import { OperationPieComponent } from './operation/operation.component';
import { VolumeBarComponent } from './volume/volume.component';
import { DatasizeBarComponent } from './datasize/datasize.component';
import { CrudMultipleLineComponent } from './crud/crud.component';

// # Service Provider
import { CrudService } from './crud/crud.service';
import { WebsocketService } from './main/websocket.service';

@NgModule({
  imports: [
    HttpClientModule,
    NbCardModule,
    ThemeModule,
    NgxEchartsModule,
    NgxChartsModule,
  ],
  declarations: [
    DashboardComponent,
    MainGraphChartComponent,
    CategoryPieChartComponent,
    CmpRadarComponent,
    OperationPieComponent,
    VolumeBarComponent,
    DatasizeBarComponent,
    CrudMultipleLineComponent,
  ],

  providers: [HttpClientModule, CrudService, WebsocketService],
})
export class DashboardModule { }
