import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GameInitComponent } from '../app/game-init/game-init.component';

const routes: Routes = [
  { path: 'game', component: GameInitComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
