import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  doc,
  DocumentData,
  DocumentSnapshot,
  Firestore,
  onSnapshot,
  setDoc,
  Unsubscribe,
} from '@angular/fire/firestore';
import { ActivatedRoute, Data } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { first } from 'rxjs';
import { PATH } from 'src/app/app-routing.module';
import Game from 'src/app/dto/Game';
import GameRound from 'src/app/dto/GameRound';
import { LetterGuessFormComponent } from '../../forms/letter-guess/letter-guess-form.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit, OnDestroy {
  public gameLoading = true;
  public revealLoading = false;
  public gameSentenceLoading = false;
  public game!: Game;
  private playerId!: string;
  private gameListenerUnsubscribe!: Unsubscribe;

  @ViewChild(LetterGuessFormComponent)
  letterGuessForm!: LetterGuessFormComponent;

  constructor(
    private db: Firestore,
    private route: ActivatedRoute,
    private cookies: CookieService
  ) {}

  public ngOnInit(): void {
    const appName = this.db.app.name;
    this.playerId = this.cookies.get(appName);
    this.route.data.pipe(first()).subscribe((routeData: Data) => {
      const game = routeData[0] as Game;

      this.gameListenerUnsubscribe = onSnapshot(
        doc(this.db, PATH.GAMES, game.id),
        (doc: DocumentSnapshot<DocumentData>) => {
          this.game = doc.data() as Game;
          this.gameLoading = false;
        }
      );
    });
  }

  public get isGameMaster(): boolean {
    return this.playerId == this.game?.gameMaster;
  }

  public ngOnDestroy(): void {
    this.gameListenerUnsubscribe?.();
  }

  public async revealSentence(): Promise<void> {
    this.revealLoading = true;
    const currentRound = this.getRoundCount();

    await setDoc(
      doc(this.db, PATH.GAMES, this.game.id),
      {
        rounds: {
          [currentRound]: {
            isReveal: true,
          },
        },
      } as Game,
      { merge: true }
    );

    this.revealLoading = false;
  }

  public async startRound(game: GameRound): Promise<void> {
    this.gameLoading = true;

    const currentRound = this.getRoundCount();

    await setDoc(
      doc(this.db, PATH.GAMES, this.game.id),
      {
        rounds: {
          [currentRound]: {
            category: game.category.toUpperCase(),
            sentence: game.sentence.toUpperCase(),
          },
        },
      } as Game,
      { merge: true }
    );
  }

  public async endRound(): Promise<void> {
    const currentRound = this.getRoundCount() + 1;

    await setDoc(
      doc(this.db, PATH.GAMES, this.game.id),
      {
        rounds: {
          [currentRound]: {},
        },
      } as Game,
      { merge: true }
    );
  }

  public async submitLetterGuess(letter: string): Promise<void> {
    this.gameSentenceLoading = true;

    const round = this.getCurrentRound();

    if (round.guesses?.includes(letter)) {
      this.gameSentenceLoading = false;
      this.letterGuessForm.reset();
      return;
    }

    const currentRoundCount = this.getRoundCount();
    const currentRound = this.game.rounds[currentRoundCount];

    const previousGuesses = currentRound?.guesses ? currentRound.guesses : [];

    await setDoc(
      doc(this.db, PATH.GAMES, this.game.id),
      {
        rounds: {
          [currentRoundCount]: {
            guesses: [...previousGuesses, letter],
          },
        },
      } as Game,
      { merge: true }
    );

    this.gameSentenceLoading = false;
    this.letterGuessForm.reset();
  }

  private getRoundCount(): number {
    return Object.keys(this.game?.rounds ?? {}).length;
  }

  private getCurrentRound(): GameRound {
    return this.game?.rounds?.[this.getRoundCount()];
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
}
