import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { NewGameComponent } from './components/pages/new-game/new-game.component';
import { GameGuard } from './guards/game.guard';

export enum PATH {
  GAMES = 'games',
}

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: `${PATH.GAMES}/:id`,
    component: NewGameComponent,
    resolve: [GameGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
