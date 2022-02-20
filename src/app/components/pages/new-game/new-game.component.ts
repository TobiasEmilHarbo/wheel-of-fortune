import { Component, OnDestroy, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss'],
})
export class NewGameComponent implements OnInit, OnDestroy {
  public loading = true;
  public game!: Game;
  private gameListenerUnsubscribe!: Unsubscribe;

  constructor(private db: Firestore, private route: ActivatedRoute) {}

  public ngOnInit(): void {
    this.route.data.pipe(first()).subscribe((routeData: Data) => {
      const game = routeData[0] as Game;

      this.gameListenerUnsubscribe = onSnapshot(
        doc(this.db, PATH.GAMES, game.id),
        (doc: DocumentSnapshot<DocumentData>) => {
          this.game = doc.data() as Game;
          this.loading = false;
        }
      );
    });
  }

  public ngOnDestroy(): void {
    this.gameListenerUnsubscribe?.();
  }

  public async submit(sentence: string): Promise<void> {
    this.loading = true;

    await setDoc(
      doc(this.db, PATH.GAMES, this.game.id),
      {
        sentence: sentence,
      } as Game,
      { merge: true }
    );
  }
}
