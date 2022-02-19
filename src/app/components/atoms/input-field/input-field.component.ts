import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputFieldComponent),
      multi: true,
    },
  ],
})
export class InputFieldComponent implements ControlValueAccessor {
  @Input()
  public flatten!: 'left' | 'right';
  @Input()
  public type: string = 'text';
  @Input()
  public placeholder!: string;
  @Input()
  public errorMessages!: { [error: string]: string };
  @Input()
  public formGroup!: FormGroup;
  @Input()
  public formControlName!: string;

  public onChanged: any = () => {};
  public onTouched: any = () => {};

  public isDisabled!: boolean;

  private _value!: string;

  public writeValue(value: string): void {
    this._value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  public get value(): string {
    if (!this.formGroup) return this._value;
    else return this.formGroup.get(this.formControlName)?.value;
  }

  public set value(value: string) {
    if (!this.formGroup) this._value = value;
    else this.formGroup.get(this.formControlName)?.setValue(value);

    this.onChanged(value);
    this.onTouched(value);
  }

  public getError(): string | null {
    if (!this.errorMessages) return null;
    const errors = this.formGroup.get(this.formControlName)?.errors;
    if (!errors) return null;

    const firstKey = Object.keys(errors).pop();
    if (!firstKey) return null;

    return this.errorMessages[firstKey];
  }

  public hasErrors() {
    return (
      !!this.formGroup.get(this.formControlName)?.errors &&
      this.formGroup.get(this.formControlName)?.touched
    );
  }
}
