import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import Game from 'src/app/dto/Game';

function maxSentenceLength(maxSentenceLength: number): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const forbidden = control.value
      ?.split(' ')
      .find((word: string) => word.length > maxSentenceLength);
    return !!forbidden ? { wordMaxLength: { value: control.value } } : null;
  };
}

@Component({
  selector: 'app-game-sentence-form',
  templateUrl: './game-sentence-form.component.html',
  styleUrls: ['./game-sentence-form.component.scss'],
})
export class GameSentenceFormComponent {
  @Input() public isLoading!: boolean;
  @Output() public onSubmit = new EventEmitter<Game>();

  public error: string | null = null;

  public gameSentenceInput: string = 'gameSentence';
  public categoryInput: string = 'category';

  public form: FormGroup = new FormGroup({
    [this.categoryInput]: new FormControl({ value: null, disabled: false }, [
      Validators.required,
    ]),
    [this.gameSentenceInput]: new FormControl(
      { value: null, disabled: false },
      [
        Validators.required,
        Validators.pattern(/^[\p{L}\s\-,]*$/gu),
        maxSentenceLength(11),
      ]
    ),
  });

  public errors: {
    [inputField: string]: {
      [rule: string]: string;
    };
  } = {
    [this.categoryInput]: {
      required: 'Please enter a category',
    },
    [this.gameSentenceInput]: {
      required: 'Please enter a sentence',
      pattern: 'Hello',
      wordMaxLength: 'Words cannot exceed a length of 11',
    },
  };

  public submit() {
    const sentence = this.form.get(this.gameSentenceInput)?.value;
    const category = this.form.get(this.categoryInput)?.value;

    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    this.onSubmit.emit({
      sentence,
      category,
    } as Game);
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
