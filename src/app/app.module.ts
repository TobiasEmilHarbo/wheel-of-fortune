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
import { NewGameComponent } from './components/pages/new-game/new-game.component';
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

import * as config from './../../firebase-app-config.json';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ButtonComponent,
    TextareaComponent,
    InputFieldComponent,
    ButtonFieldComponent,
    JoinGameFormComponent,
    NewGameComponent,
    GameSentenceFormComponent,
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
  providers: [ScreenTrackingService, UserTrackingService, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
