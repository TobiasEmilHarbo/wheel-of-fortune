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
import { first, from, Observable } from 'rxjs';
import { PATH } from 'src/app/app-routing.module';
import Game from 'src/app/dto/Game';
import GameRound from 'src/app/dto/GameRound';
import { WebcamService } from 'src/app/services/webcam.service';
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
  public showLetterGuessesLoading = false;
  public showWebcamLoading = false;
  public gameState!: Game;
  public playerId!: string;
  public webcams: Observable<Array<MediaDeviceInfo>>;

  private gameListenerUnsubscribe!: Unsubscribe;

  @ViewChild(LetterGuessFormComponent)
  letterGuessForm!: LetterGuessFormComponent;

  constructor(
    private window: Window,
    private db: Firestore,
    private route: ActivatedRoute,
    private cookies: CookieService,
    private webcamService: WebcamService,
  ) {
    this.webcams = from(this.webcamService.getWebcams());
  }

  public ngOnInit(): void {
    const appName = this.db.app.name;
    this.playerId = this.cookies.get(appName);

    this.route.data.pipe(first()).subscribe((routeData: Data) => {
      this.gameState = routeData[0];

      this.gameListenerUnsubscribe = onSnapshot(
        doc(this.db, PATH.GAMES, this.gameState.id),
        (doc: DocumentSnapshot<DocumentData>) => {
          this.gameState = new Game(doc.data() as Game);
          this.gameLoading = false;
        }
      );
    });
  }

  public ngOnDestroy(): void {
    this.gameListenerUnsubscribe?.();
  }

  public async openGameBoard(): Promise<Window | null> {
    return new Promise((resolve) => {
      const board = this.window.open(
        `${PATH.GAMES}/${this.gameState.id}/${PATH.BOARD}`,
        'Wheel of fortune',
        'popup'
      );

      resolve(board)
    })
  }

  public async revealSentence(): Promise<void> {
    this.revealLoading = true;
    const currentRound = this.gameState.getRoundCount();

    await setDoc(
      doc(this.db, PATH.GAMES, this.gameState.id),
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

    const currentRound = this.gameState.getRoundCount();

    await setDoc(
      doc(this.db, PATH.GAMES, this.gameState.id),
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
    const nextRound = this.gameState.getRoundCount() + 1;

    await setDoc(
      doc(this.db, PATH.GAMES, this.gameState.id),
      {
        rounds: {
          [nextRound]: {},
        },
      } as Game,
      { merge: true }
    );
  }

  public async submitLetterGuess(letter: string): Promise<void> {
    this.gameSentenceLoading = true;

    const currentRound = this.gameState.getCurrentRound();

    if (currentRound.guesses?.includes(letter)) {
      this.gameSentenceLoading = false;
      this.letterGuessForm.reset();
      return;
    }

    const currentRoundCount = this.gameState.getRoundCount();

    const previousGuesses = currentRound?.guesses ? currentRound.guesses : [];

    await setDoc(
      doc(this.db, PATH.GAMES, this.gameState.id),
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

  public async toggleShowGuesses(): Promise<void> {
    this.showLetterGuessesLoading = true;
    await setDoc(
      doc(this.db, PATH.GAMES, this.gameState.id),
      {
        showLetterGuesses: !this.gameState.showLetterGuesses,
      } as Game,
      { merge: true }
    );
    this.showLetterGuessesLoading = false;
  }

  public async toggleWebcam(): Promise<void> {
    this.showWebcamLoading = true;
    await setDoc(
      doc(this.db, PATH.GAMES, this.gameState.id),
      {
        showWebcam: !this.gameState.showWebcam,
      } as Game,
      { merge: true }
    )
    this.showWebcamLoading = false;
  }

  public async chooseWebcam(webcamId: string): Promise<void> {
    if (!this.gameState.showWebcam) return

    const board = await this.openGameBoard();

    setTimeout(() => {
      const event = new CustomEvent("switchWebcam", {
        cancelable: true,
        detail: webcamId
      });
      board?.dispatchEvent(event);
    }, 1000)
  }
}
