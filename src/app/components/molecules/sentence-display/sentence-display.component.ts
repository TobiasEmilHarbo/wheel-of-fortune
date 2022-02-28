import { Component, Input, OnInit } from '@angular/core';

class LetterPosition {
  private _guessed: boolean = false;
  protected _isBlank: boolean = false;

  constructor(private _character: string) {}

  public get character(): string {
    return this._character;
  }

  public set guessed(guessed: boolean) {
    this._guessed = guessed;
  }

  public get guessed(): boolean {
    return this._guessed;
  }

  public get isBlack(): boolean {
    return this._isBlank;
  }
}

class BlankPosition extends LetterPosition {
  constructor() {
    super('_');
    this._isBlank = true;
  }
}

@Component({
  selector: 'app-sentence-display',
  templateUrl: './sentence-display.component.html',
  styleUrls: ['./sentence-display.component.scss'],
})
export class SentenceDisplayComponent implements OnInit {
  @Input() public sentence!: string;
  @Input() public isRevealed!: boolean;

  private letterMap: Map<string, Array<LetterPosition>> = new Map();
  private _guesses!: Array<string>;
  public letterPositions: Array<LetterPosition> = [];

  public ngOnInit(): void {
    const words = this.sentence?.split(' ');

    const maxLineLength = 11;

    const lines: Array<Array<string>> = [[]];

    let currentLineIndex = 0;

    words.forEach((word) => {
      const currentLineLength = this.getLineLength(lines[currentLineIndex]);
      if (word.length + 1 + currentLineLength > maxLineLength) {
        currentLineIndex++;
        lines[currentLineIndex] = [];
      }

      lines[currentLineIndex].push(word);
    });

    if (lines.length == 1) {
      lines.push([]);
    }

    if (lines.length == 2) {
      lines.unshift([]);
      lines.push([]);
    }

    if (lines.length == 3) {
      lines.push([]);
    }

    this.letterPositions = lines.flatMap((line) => {
      const lineLength = this.getLineLength(line);
      const paddingLength = maxLineLength - lineLength;

      const rightPadding: Array<BlankPosition> = [];
      rightPadding.length = Math.floor(paddingLength / 2);
      rightPadding.fill(new BlankPosition());

      const leftPadding: Array<BlankPosition> = [];
      leftPadding.length = paddingLength - rightPadding.length;
      leftPadding.fill(new BlankPosition());

      const letters = line.flatMap((word, i, arr) => {
        const letters = word.split('').map((character) => {
          const letterPosition = new LetterPosition(character);
          if (character.match(/[-?.=,]/)?.length) {
            letterPosition.guessed = true;
          }
          this.addToLetterMap(letterPosition);
          return letterPosition;
        });
        const addSpace = i != arr.length - 1;
        if (addSpace) {
          return [...letters, new BlankPosition()];
        }
        return letters;
      });

      return [...leftPadding, ...letters, ...rightPadding];
    });

    this.updateLetterPositions(this.guesses);
  }

  private addToLetterMap(letterPosition: LetterPosition) {
    const list = this.letterMap.get(letterPosition.character) ?? [];
    list.push(letterPosition);
    this.letterMap.set(letterPosition.character, list);
  }

  private getLineLength(words: Array<string>): number {
    return (
      (words?.reduce(
        (prevValue, currValue) => prevValue + currValue.length,
        0
      ) ?? 0) + this.getSentenceSpaces(words)
    );
  }

  private getSentenceSpaces(words: Array<string>): number {
    return (words?.length ?? 0) > 0 ? words.length - 1 : 0;
  }

  @Input() public set guesses(guesses: Array<string>) {
    this._guesses = guesses;
    this.updateLetterPositions(guesses);
  }

  public get guesses(): Array<string> {
    return this._guesses;
  }

  private updateLetterPositions(guesses: Array<string>) {
    guesses?.forEach((guess) => {
      const letters = this.letterMap.get(guess) ?? [];
      letters.forEach((letter) => {
        letter.guessed = true;
      });
    });
  }
}
