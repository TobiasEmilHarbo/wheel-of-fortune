import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import Game from '../dto/Game';
import { PATH } from '../app-routing.module';

@Injectable({
  providedIn: 'root',
})
export class GameGuard implements Resolve<any> {
  constructor(private db: Firestore) {}
  async resolve(next: ActivatedRouteSnapshot): Promise<Game | null> {
    const gameId = next.params['id'];
    const docRef = doc(this.db, PATH.GAMES, gameId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return new Game(docSnap.data() as Game);
    }

    return null;
  }
}
