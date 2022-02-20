import { Component, Input, OnInit } from '@angular/core';

interface Letter {
  character: string;
  guessed: boolean;
}

@Component({
  selector: 'app-game-master-sentence-display',
  templateUrl: './game-master-sentence-display.component.html',
  styleUrls: ['./game-master-sentence-display.component.scss'],
})
export class GameMasterSentenceDisplayComponent implements OnInit {
  @Input() public sentence!: string;

  private _guesses!: Array<String>;

  public words!: Array<Array<Letter>>;

  public ngOnInit(): void {
    this.updateGuesses();
  }

  @Input() public set guesses(guesses: Array<String>) {
    this._guesses = guesses;
    this.updateGuesses();
  }

  public get guesses(): Array<String> {
    return this._guesses;
  }

  private updateGuesses() {
    const words = this.sentence.split(' ');
    this.words = words.map((word) =>
      word.split('').map((letter) => {
        return {
          character: letter,
          guessed: this._guesses.includes(letter),
        };
      })
    );
  }
}
