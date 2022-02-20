import { Component } from '@angular/core';
import { collection, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public loadingNewGame = false;

  constructor(
    private cookies: CookieService,
    private firestore: Firestore,
    private router: Router
  ) {}

  public async createNewGame(): Promise<void> {
    this.loadingNewGame = true;
    const appName = this.firestore.app.name;
    const playerId = this.cookies.get(appName);
    const newGameDoc = doc(collection(this.firestore, 'games'));
    await setDoc(newGameDoc, {
      id: newGameDoc.id,
      gameMaster: playerId,
    });

    this.router.navigate(['games', newGameDoc.id]);
    this.loadingNewGame = false;
  }
}
