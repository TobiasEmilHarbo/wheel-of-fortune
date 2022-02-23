import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-letter-guess-form',
  templateUrl: './letter-guess-form.component.html',
  styleUrls: ['./letter-guess-form.component.scss'],
})
export class LetterGuessFormComponent {
  public error: string | null = null;
  private _isLoading!: boolean;
  @Output() public onSubmit = new EventEmitter<string>();

  public letterInput: string = 'letter';

  public form: FormGroup = new FormGroup({
    [this.letterInput]: new FormControl({ value: null, disabled: false }, [
      Validators.required,
      Validators.maxLength(1),
      Validators.pattern(/\p{L}/u),
    ]),
  });

  public errors: {
    [inputField: string]: {
      [rule: string]: string;
    };
  } = {
    [this.letterInput]: {
      required: 'Please enter a letter',
      pattern: 'Must be a letter',
      maxlength: 'Only one character at a time',
    },
  };

  public get isLoading(): boolean {
    return this._isLoading;
  }

  @Input() public set isLoading(loading: boolean) {
    if (!loading) this.form.reset();
    this._isLoading = loading;
  }

  public submit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const letter = this.form.get(this.letterInput)?.value;
    this.onSubmit.emit(letter.toUpperCase());
  }

  public reset() {
    this.form.reset();
  }

  public hasError(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!field?.errors && this.form.touched;
  }

  public getError(field: string): string | null {
    const errors = this.form.get(field)?.errors;
    if (!errors) return null;
    const firstKey = Object.keys(errors)[0];
    return this.errors[field][firstKey];
  }

  public clearErrors() {
    this.error = null;
  }
}
