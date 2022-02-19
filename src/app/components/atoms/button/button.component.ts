import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input()
  public type: 'submit' | 'reset' | 'button' = 'button';

  @Input()
  public icon: boolean = false;

  @Input()
  public isLoading: boolean = false;

  @Input()
  public set disabled(disabled: boolean) {
    if (!disabled) this._disabled = null;
    else this._disabled = true;
  }

  private _disabled: true | null = null;

  //@ts-ignore
  public get disabled(): boolean | null {
    return this._disabled;
  }
}
