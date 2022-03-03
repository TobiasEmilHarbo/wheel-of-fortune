import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  doc,
  DocumentData,
  DocumentSnapshot,
  Firestore,
  onSnapshot,
  Unsubscribe,
} from '@angular/fire/firestore';
import { ActivatedRoute, Data } from '@angular/router';
import { combineLatest, first, map, Observable, of, switchMap } from 'rxjs';
import { PATH } from 'src/app/app-routing.module';
import Game from 'src/app/dto/Game';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  public gameLoading = true;

  public gameState!: Game;
  private gameListenerUnsubscribe!: Unsubscribe;

  constructor(private route: ActivatedRoute, private db: Firestore) {}

  public ngOnInit(): void {
    this.route.data.pipe(first()).subscribe((routeData: Data) => {
      this.gameState = routeData[0];
      console.log(this.gameState);
      this.gameListenerUnsubscribe = onSnapshot(
        doc(this.db, PATH.GAMES, this.gameState.id),
        (doc: DocumentSnapshot<DocumentData>) => {
          const newGameState = new Game(doc.data() as Game);
          this.reactToNewGameState(this.gameState, newGameState);
          this.gameState = newGameState;
          this.gameLoading = false;
        }
      );
    });
  }

  public ngOnDestroy(): void {
    this.gameListenerUnsubscribe?.();
  }

  public reactToNewGameState(oldGameState: Game, newGameState: Game) {
    const consonantsRemaining = newGameState.consonantsRemaining;
    if (
      oldGameState != null &&
      consonantsRemaining.length != oldGameState.consonantsRemaining.length &&
      consonantsRemaining.length < 1
    ) {
      const audio = new Audio();
      audio.src = 'assets/sounds/only-vowels-left.mp3';
      audio.load();
      audio.play();
    }
  }
}
