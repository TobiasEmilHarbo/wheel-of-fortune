import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonFieldComponent } from './components/atoms/button-field/button-field.component';
import { ButtonComponent } from './components/atoms/button/button.component';
import { InputFieldComponent } from './components/atoms/input-field/input-field.component';
import { JoinGameFormComponent } from './components/forms/join-game/join-game-form.component';
import { HomeComponent } from './components/pages/home/home.component';
import { IconsModule } from './templates/icons.module';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import {
  provideAnalytics,
  getAnalytics,
  ScreenTrackingService,
  UserTrackingService,
} from '@angular/fire/analytics';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFunctions, getFunctions } from '@angular/fire/functions';
import { provideMessaging, getMessaging } from '@angular/fire/messaging';
import { providePerformance, getPerformance } from '@angular/fire/performance';
import { GameSentenceFormComponent } from './components/forms/game-sentence/game-sentence-form.component';
import { CookieService } from 'ngx-cookie-service';
import { TextareaComponent } from './components/atoms/textarea/textarea.component';
import { LetterGuessFormComponent } from './components/forms/letter-guess/letter-guess-form.component';
import { GameMasterSentenceDisplayComponent } from './components/molecules/game-master-sentence-display/game-master-sentence-display.component';
import { SentenceDisplayComponent } from './components/molecules/sentence-display/sentence-display.component';
import { FlipLetterComponent } from './components/atoms/flip-letter/flip-letter.component';

import * as config from './../../firebase-app-config.json';
import { GameComponent } from './components/pages/game/game.component';
import { CheckboxComponent } from './components/atoms/checkbox/checkbox.component';
import { ToggleButtonComponent } from './components/atoms/toggle-button/toggle-button.component';
import { BoardComponent } from './components/pages/board/board.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ButtonComponent,
    TextareaComponent,
    InputFieldComponent,
    ButtonFieldComponent,
    JoinGameFormComponent,
    LetterGuessFormComponent,
    GameSentenceFormComponent,
    GameMasterSentenceDisplayComponent,
    SentenceDisplayComponent,
    FlipLetterComponent,
    GameComponent,
    CheckboxComponent,
    ToggleButtonComponent,
    BoardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    IconsModule,
    provideFirebaseApp(() => initializeApp(config)),
    provideFirestore(() => getFirestore()),
    provideAnalytics(() => getAnalytics()),
    provideAuth(() => getAuth()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
  ],
  providers: [
    ScreenTrackingService,
    UserTrackingService,
    CookieService,
    { provide: Window, useValue: window },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
