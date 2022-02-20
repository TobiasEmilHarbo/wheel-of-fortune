import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-game-sentence-form',
  templateUrl: './game-sentence-form.component.html',
  styleUrls: ['./game-sentence-form.component.scss'],
})
export class GameSentenceFormComponent {
  @Input() public isLoading!: boolean;
  @Output() public onSubmit = new EventEmitter<string>();

  public error: string | null = null;

  public gameSentenceInput: string = 'gameSentence';

  public form: FormGroup = new FormGroup({
    [this.gameSentenceInput]: new FormControl(
      { value: null, disabled: false },
      [Validators.required]
    ),
  });

  public errors: {
    [inputField: string]: {
      [rule: string]: string;
    };
  } = {
    [this.gameSentenceInput]: {
      required: 'Please enter a sentence',
    },
  };

  public submit() {
    const sentence = this.form.get(this.gameSentenceInput)?.value;

    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    this.onSubmit.emit(sentence);
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
