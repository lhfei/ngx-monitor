import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';

// <nb-menu [items]="menu"></nb-menu>
@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-mix-column-layout>

      <router-outlet></router-outlet>
    </ngx-mix-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
}
