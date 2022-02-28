import GameRound from './GameRound';

export default interface Game {
  id: string;
  gameMaster: string;
  rounds: { [count: number]: GameRound };
}
