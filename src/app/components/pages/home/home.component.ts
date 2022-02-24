import { Component } from '@angular/core';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PATH } from 'src/app/app-routing.module';
import Game from 'src/app/dto/Game';
import GameRound from 'src/app/dto/GameRound';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public loadingNewGame = false;

  private firstRound: number = 1;

  constructor(
    private cookies: CookieService,
    private db: Firestore,
    private router: Router
  ) {}

  public async createNewGame(): Promise<void> {
    this.loadingNewGame = true;
    const appName = this.db.app.name;
    const playerId = this.cookies.get(appName);
    const newGame = doc(collection(this.db, PATH.GAMES));
    await setDoc(newGame, {
      id: newGame.id,
      gameMaster: playerId,
      rounds: {},
    } as Game);

    await setDoc(
      doc(this.db, PATH.GAMES, newGame.id),
      {
        rounds: {
          [this.firstRound]: {},
        },
      } as Game,
      { merge: true }
    );

    this.router.navigate([PATH.GAMES, newGame.id]);
    this.loadingNewGame = false;
  }
}
