import { Component, OnInit } from '@angular/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';
import { addDoc } from 'firebase/firestore';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'wheel-of-fortune';

  constructor(private cookies: CookieService, private firestore: Firestore) {}

  public async ngOnInit(): Promise<void> {
    const appName = this.firestore.app.name;
    const playerId = this.cookies.get(appName);

    if (!!playerId) return;

    const newPlayer = doc(collection(this.firestore, 'players'));
    await setDoc(newPlayer, {
      name: null,
    });

    this.cookies.set(appName, newPlayer.id);
  }
}
