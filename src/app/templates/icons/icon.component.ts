import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-icon',
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      [attr.stroke]="color"
      [attr.stroke-width]="strokeWidth"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="feather feather-icon"
    >
      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
      <line x1="16" y1="8" x2="2" y2="22"></line>
      <line x1="17.5" y1="15" x2="9" y2="15"></line>
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
export class IconComponent {
  @Input() color: string = 'currentColor';
  @Input() strokeWidth: number = 2;
}
