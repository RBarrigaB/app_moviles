import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemonDetallesPage } from './pokemon-detalles.page';

const routes: Routes = [
  {
    path: '',
    component: PokemonDetallesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PokemonDetallesPageRoutingModule {}
