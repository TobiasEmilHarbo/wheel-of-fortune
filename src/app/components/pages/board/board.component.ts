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
import { first } from 'rxjs';
import { PATH } from 'src/app/app-routing.module';
import Game from 'src/app/dto/Game';
import { SOUNDS } from 'src/app/resolvers/sound.resolver';
import { WebcamService } from 'src/app/services/webcam.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit, OnDestroy {
  public gameLoading = true;
  public audioLoading = true;
  public gameState!: Game;
  private gameListenerUnsubscribe!: Unsubscribe;
  private sounds!: {
    [title: string]: HTMLAudioElement;
  };

  constructor(private route: ActivatedRoute, private db: Firestore, private window: Window, private webcamService: WebcamService) {}

  public ngOnInit(): void {
    this.route.data.pipe(first()).subscribe((routeData: Data) => {
      this.sounds = routeData['sounds'];
      this.gameState = routeData['game'];
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

    this.window.addEventListener("switchWebcam", (event) => {
      this.webcamService.setCamera((<any>event).detail);
    });
  }

  public ngOnDestroy(): void {
    this.gameListenerUnsubscribe?.();
  }

  public reactToNewGameState(oldGameState: Game, newGameState: Game) {
    const oldGuesses = oldGameState.guesses;
    const newGuesses = newGameState.guesses;

    const guess = newGuesses?.filter(
      (letter) => !oldGuesses?.includes(letter)
    )[0];

    const consonantsRemaining = newGameState.getConsonantsRemaining();

    if (
      oldGameState != null &&
      consonantsRemaining.length !=
        oldGameState.getConsonantsRemaining().length &&
      consonantsRemaining.length < 1
    ) {
      this.sounds[SOUNDS.ONLY_VOWELS_LEFT].play();
    } else if (!!guess) {
      if (!oldGameState.sentence.includes(guess)) {
        this.sounds[SOUNDS.WRONG_GUESS].play();
      } else {
        this.sounds[SOUNDS.CORRECT_GUESS].play();
      }
    }
  }
}
