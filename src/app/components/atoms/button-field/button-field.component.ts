import {
  Component,
  Input,
  ViewChild,
  forwardRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { InputFieldComponent } from '../input-field/input-field.component';
import {
  ControlValueAccessor,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-button-field',
  templateUrl: './button-field.component.html',
  styleUrls: ['./button-field.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ButtonFieldComponent),
      multi: true,
    },
  ],
})
export class ButtonFieldComponent implements ControlValueAccessor {
  @Output() public onSubmit = new EventEmitter<MouseEvent>();

  @Input() public placeholder!: string;
  @Input() public buttonValue!: string;
  @Input() public isLoading!: boolean;
  @Input() public formGroup!: FormGroup;
  @Input() public formControlName!: string;

  @Input() public set disabled(disabled: boolean) {
    if (disabled) this.formGroup.disable();
    else this.formGroup.enable();
  }

  public get disabled(): boolean {
    return this.formGroup.disabled;
  }

  @ViewChild(InputFieldComponent, { static: true })
  private _inputField!: InputFieldComponent;

  public writeValue(value: string): void {
    this._inputField.writeValue(value);
  }

  public registerOnChange(fn: any): void {
    this._inputField.registerOnChange(fn);
  }

  public registerOnTouched(fn: any): void {
    this._inputField.registerOnTouched(fn);
  }

  public setDisabledState(isDisabled: boolean): void {
    this._inputField.setDisabledState(isDisabled);
  }

  public submit($event: MouseEvent) {
    this.onSubmit.emit($event);
  }

  public get value(): string {
    return this._inputField.value;
  }
}
