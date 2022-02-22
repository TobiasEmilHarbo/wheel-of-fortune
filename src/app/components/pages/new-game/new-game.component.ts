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
import { LetterGuessFormComponent } from '../../forms/letter-guess/letter-guess-form.component';

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss'],
})
export class NewGameComponent implements OnInit, OnDestroy {
  public gameLoading = true;
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

  public async submitSentence(sentence: string): Promise<void> {
    this.gameLoading = true;

    await setDoc(
      doc(this.db, PATH.GAMES, this.game.id),
      {
        sentence: sentence.toUpperCase(),
      } as Game,
      { merge: true }
    );
  }

  public async submitLetterGuess(letter: string): Promise<void> {
    this.gameSentenceLoading = true;

    if (this.game.guesses?.includes(letter)) {
      this.gameSentenceLoading = false;
      this.letterGuessForm.reset();
      return;
    }

    const previousGuesses = this.game?.guesses ? this.game.guesses : [];

    await setDoc(
      doc(this.db, PATH.GAMES, this.game.id),
      {
        guesses: [...previousGuesses, letter],
      } as Game,
      { merge: true }
    );

    this.gameSentenceLoading = false;
    this.letterGuessForm.reset();
  }
}
