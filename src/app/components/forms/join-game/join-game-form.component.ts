import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-join-game-form',
  templateUrl: './join-game-form.component.html',
  styleUrls: ['./join-game-form.component.scss'],
})
export class JoinGameFormComponent {
  public loading!: boolean;
  public error: string | null = null;

  public gameIdInputName: string = 'gameId';

  public form: FormGroup = new FormGroup({
    [this.gameIdInputName]: new FormControl({ value: null, disabled: false }, [
      Validators.pattern('[a-zA-Z0-9]*'),
      Validators.minLength(5),
      Validators.required,
    ]),
  });

  public errors: {
    [inputField: string]: {
      [rule: string]: string;
    };
  } = {
    [this.gameIdInputName]: {
      required: 'Please enter an ID',
      pattern: 'ID can only contain letters and numbers',
      minlength: 'ID must be at least 5 characters long',
      409: 'Too many players in lobby',
      404: 'No game found with that ID. Check the ID and try again',
      401: 'You cannot join this game at the moment',
    },
  };

  public onSubmit() {
    const gameId = this.form.get('gameId')?.value;
    console.log('GAME ID', gameId);
    this.form.markAllAsTouched();

    if (this.form.invalid) return;

    this.loading = true;
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
