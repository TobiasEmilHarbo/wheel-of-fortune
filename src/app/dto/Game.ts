export default interface Game {
  id: string;
  gameMaster: string;
  sentence: string;
  guesses: Array<string>;
}
