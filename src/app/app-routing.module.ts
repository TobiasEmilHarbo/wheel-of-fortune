import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './components/pages/game/game.component';
import { HomeComponent } from './components/pages/home/home.component';
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
    component: GameComponent,
    resolve: [GameGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
