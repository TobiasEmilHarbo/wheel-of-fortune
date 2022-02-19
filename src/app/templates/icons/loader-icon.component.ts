import { Component, Input } from '@angular/core';
import { IconComponent } from './icon.component';

@Component({
  selector: 'app-loader-icon',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      [attr.stroke]="color"
      [attr.stroke-width]="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-loader"
    >
      <line x1="12" y1="2" x2="12" y2="6"></line>
      <line x1="12" y1="18" x2="12" y2="22"></line>
      <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
      <line x1="2" y1="12" x2="6" y2="12"></line>
      <line x1="18" y1="12" x2="22" y2="12"></line>
      <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
      <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
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

      svg {
        animation: rotation 2s infinite linear;
        -webkit-animation: rotation 2s infinite linear;
      }

      @keyframes rotation {
        from {
          transform: rotate(0deg);
          -webkit-transform: rotate(0deg);
        }
        to {
          transform: rotate(359deg);
          -webkit-transform: rotate(359deg);
        }
      }
    `,
  ],
})
export class LoaderIconComponent extends IconComponent {}
