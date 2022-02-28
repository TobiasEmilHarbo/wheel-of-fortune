export default interface GameRound {
  isReveal: boolean;
  sentence: string;
  category: string;
  guesses: Array<string>;
}
