import { Component } from '@angular/core';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-check-icon',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      [attr.stroke]="color"
      [attr.stroke-width]="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-check"
    >
      <polyline points="20 6 9 17 4 12"></polyline>
    </svg>
  `,
  styles: [
    `
      :host {
        display: block;
        height: 24px;
        width: 24px;
        margin: 0 auto;
      }

      :host.inline {
        display: inline-block;
        margin: 0;
      }
    `,
  ],
})
export class CheckIconComponent extends IconComponent {}
