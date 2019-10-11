import { Component } from '@angular/core';

@Component({
  selector: 'ngx-footer',
  styleUrls: ['./footer.component.scss'],
  template: `
    <span class="created-by">Copyright © 2004-2019  <a href="https://jd.com" target="_blank">京东</a> 版权所有</span>
  `,
})
export class FooterComponent {
}
