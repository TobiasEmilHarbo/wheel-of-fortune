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

  //@ts-ignore
  @Input() public placeholder: string;
  //@ts-ignore
  @Input() public buttonValue: string;
  //@ts-ignore
  @Input() public isLoading: boolean;

  //@ts-ignore
  @Input() public formGroup: FormGroup;
  //@ts-ignore
  @Input() public formControlName: string;

  @Input() public set disabled(disabeld: boolean) {
    if (disabeld) this.formGroup.disable();
    else this.formGroup.enable();
  }

  public get disabled(): boolean {
    return this.formGroup.disabled;
  }

  @ViewChild(InputFieldComponent, { static: true })
  //@ts-ignore
  private _inputField: InputFieldComponent;

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

  public get value(): string {
    return this._inputField.value;
  }
}
