import { Component, forwardRef, HostListener, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputFieldComponent } from '../input-field/input-field.component';

@Component({
  selector: 'app-toggle-button',
  templateUrl: './toggle-button.component.html',
  styleUrls: ['./toggle-button.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
})
export class ToggleButtonComponent implements ControlValueAccessor {
  private _value!: string;
  @Input() checked!: boolean;
  @Input() isLoading!: boolean;
  public async!: boolean;

  public onChanged: any = () => {};
  public onTouched: any = () => {};

  @HostListener('click')
  public clicked(): void {
    if (!this.async) {
      this.checked = !this.checked;
    }
  }

  public writeValue(value: string): void {
    this._value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
