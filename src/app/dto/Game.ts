import GameRound from './GameRound';

export default interface Game {
  id: string;
  gameMaster: string;
  showLetterGuesses: boolean;
  rounds: { [count: number]: GameRound };
}
