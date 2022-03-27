import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, reduce } from 'rxjs';

export enum SOUNDS {
  ONLY_VOWELS_LEFT = 'only-vowels-left',
  CORRECT_GUESS = 'correct-guess',
  WRONG_GUESS = 'wrong-guess',
}

interface sounds {
  [title: string]: HTMLAudioElement;
}

@Injectable({
  providedIn: 'root',
})
export class SoundResolver implements Resolve<sounds> {
  resolve(): Observable<sounds> {
    const observable: Observable<sounds> = new Observable((subscriber) => {
      const soundTitles = Object.values(SOUNDS);
      let remaining = soundTitles.length;
      soundTitles.map((title: string) => {
        const sound = new Audio();
        sound.id = title;
        sound.src = `assets/sounds/${title}.mp3`;
        sound.oncanplaythrough = () => {
          subscriber.next({
            [title]: sound,
          });
          remaining--;
          if (remaining == 0) {
            subscriber.complete();
          }
        };
        sound.load();
      });
    });

    return observable.pipe(
      reduce((combined, single) => Object.assign(combined, single))
    );
  }
}
