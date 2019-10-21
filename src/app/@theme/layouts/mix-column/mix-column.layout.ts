import { Component } from '@angular/core';

@Component({
  selector: 'ngx-mix-column-layout',
  styleUrls: ['./mix-column.layout.scss'],
  templateUrl: './mix-column.layout.html',
  // template: `
  //   <nb-layout windowMode>
  //     <nb-layout-header fixed class="bgStyle">
  //       <ngx-header class="bgStyle"></ngx-header>
  //     </nb-layout-header>

  //     <nb-layout-column>
  //       <ng-content select="router-outlet"></ng-content>
  //     </nb-layout-column>

  //     <!--<nb-layout-footer fixed>
  //       <ngx-footer></ngx-footer>
  //     </nb-layout-footer>-->
  //   </nb-layout>
  // `,
})
export class MixColumnLayoutComponent {}
