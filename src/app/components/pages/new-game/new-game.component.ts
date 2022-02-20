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
  private gameListenerUnsubscribe!: Unsubscribe;

  @ViewChild(LetterGuessFormComponent)
  letterGuessForm!: LetterGuessFormComponent;

  constructor(private db: Firestore, private route: ActivatedRoute) {}

  public ngOnInit(): void {
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
    console.log(letter);
    this.gameSentenceLoading = true;

    if (this.game.guesses.includes(letter)) {
      this.gameSentenceLoading = false;
      this.letterGuessForm.reset();
      return;
    }

    await setDoc(
      doc(this.db, PATH.GAMES, this.game.id),
      {
        guesses: [...this.game.guesses, letter],
      } as Game,
      { merge: true }
    );

    this.gameSentenceLoading = false;
    this.letterGuessForm.reset();
  }
}
