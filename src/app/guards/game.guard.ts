import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import Game from '../dto/Game';
import { PATH } from '../app-routing.module';
import { collection } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class GameGuard implements Resolve<any> {
  constructor(private router: Router, private db: Firestore) {}
  async resolve(next: ActivatedRouteSnapshot): Promise<Game | null> {
    const gameId = next.params['id'];
    const docRef = doc(this.db, PATH.GAMES, gameId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const game = docSnap.data() as Game;
      return game;
    }

    return null;
  }
}
