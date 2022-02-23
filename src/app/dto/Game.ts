export default interface Game {
  id: string;
  gameMaster: string;
  sentence: string;
  category: string;
  guesses: Array<string>;
}
