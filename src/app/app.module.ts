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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ButtonComponent,
    InputFieldComponent,
    ButtonFieldComponent,
    JoinGameFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    IconsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
