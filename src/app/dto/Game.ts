import GameRound from './GameRound';

export default class Game {
  id!: string;
  gameMaster!: string;
  showLetterGuesses!: boolean;
  rounds!: { [count: number]: GameRound };

  constructor(dto: Game) {
    this.id = dto?.id;
    this.gameMaster = dto?.gameMaster;
    this.rounds = dto?.rounds;
    this.showLetterGuesses = dto?.showLetterGuesses;
  }

  public isGameMaster(playerId: string): boolean {
    return playerId == this?.gameMaster;
  }

  public getRoundCount(): number {
    return Object.keys(this.rounds ?? {}).length;
  }

  public getCurrentRound(): GameRound {
    return this.rounds?.[this.getRoundCount()];
  }

  public get isRevealed(): boolean {
    return this.getCurrentRound()?.isReveal;
  }

  public get category(): string {
    return this.getCurrentRound()?.category;
  }

  public get sentence(): string {
    return this.getCurrentRound()?.sentence;
  }

  public get guesses(): Array<string> {
    return this.getCurrentRound()?.guesses;
  }

  public get isSentenceGuessed(): boolean {
    return (
      !!this.guesses?.length &&
      !this.sentence?.split('').find((letter: string) => {
        return !this.guesses?.includes(letter) && letter.match(/\p{L}/u);
      })?.length
    );
  }

  public getConsonantsRemaining(): Array<string> {
    return (this.sentence?.match(/[QWRTPSDFGHJKLZXCVBNM]/g) ?? []).filter(
      (letter) => {
        return !this.guesses?.includes(letter) && letter.match(/[A-Z]/g);
      }
    );
  }
}
